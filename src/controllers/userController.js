import User from "../models/User";
import fetch from "cross-fetch";
import bcrypt from "bcrypt";

const isHeroku = process.env.NODE_ENV === "production";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Create Account" });
};

export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;

  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: "Create Account",
      errorMessage: "Password confirmation does not matched.",
    });
  }

  const exists = await User.exists({ $or: [{ username }, { email }] });

  if (exists) {
    return res.status(400).render("join", {
      pageTitle: "Create Account",
      errorMessage: "This username or email is already taken.",
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.status(400).render("join", {
      pageTitle: "Create Account",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "User does not exist!",
    });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "password does not matched!",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "user:email read:user",
  };

  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  console.log(finalUrl);

  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  console.log("Finish", config);

  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  console.log(tokenRequest);
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";

    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(userData);

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    console.log(emailData);

    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true,
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: "",
        avatarUrl: userData.avatar_url,
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  //req.session.destroy();
  req.session.user = null;
  req.session.loggedIn = false;
  res.locals.loggedInUser = req.session.user;
  res.locals.isHeroku = isHeroku;

  console.log("!!!logoutlogout", res.locals);
  console.log("&&&logoutlogout");
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("users/edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email, username, location },
    file,
  } = req;

  console.log("file", file);

  // await User.findByIdAndUpdate(_id, { name, email, username, location });

  // req.session.user = {
  //   ...req.session.user,
  //   name,
  //   email,
  //   username,
  //   location,
  // };

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      // avatarUrl: file ? file.path : avatarUrl,
      avatarUrl: file ? (isHeroku ? file.location : file.path) : avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true },
  );

  req.session.user = updatedUser;

  return res.redirect("/users/edit");
};

export const seeProfile = async (req, res) => {
  const { id } = req.params;

  // double populate
  const user = await User.findById(id).populate({
    path: "videos",
    populate: {
      path: "owner",
      model: "User",
    },
  });

  if (!user) {
    return res.status(400).render("404", { pageTitle: "User not found" });
  }
  return res.render("users/profile", {
    pageTitle: `${user.name}의 Profile`,
    user,
  });
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly) return res.redirect("/");
  return res.render("users/change-password", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPassword2 },
  } = req;

  if (newPassword !== newPassword2) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "Check new password confirm !!",
    });
  }

  const user = await User.findById(_id);

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) {
    return res.status(400).render("login", {
      pageTitle: "Change Password",
      errorMessage: "password does not matched!",
    });
  }

  user.password = newPassword;
  await user.save();
  req.flash("info", "Passwprd updated");
  return res.redirect("/users/logout");
};
