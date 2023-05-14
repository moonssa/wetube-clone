import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Create Account" });
};

export const postJoin = async (req, res) => {
  console.log(req.body);
  const { name, username, email, password, password2, location } = req.body;
  const usernameExists = await User.exists({ $or: [{ username }, { email }] });
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: "Create Account",
      errorMessage: "Password confirmation does not matched.",
    });
  }
  if (usernameExists) {
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
      errorMessage: "Error",
    });
  }
};
export const login = (req, res) => res.send("Handle Login");
export const handleEditUser = (req, res) => res.send("Edit User");
export const handleDeleteUser = (req, res) => res.send("Delete User");

export const seeProfile = (req, res) => res.send("My profile");
export const handleLogout = (req, res) => res.send("Logout");
