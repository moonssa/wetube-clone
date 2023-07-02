(()=>{var e={611:(e,t,r)=>{"use strict";r.r(t),r.d(t,{defaultOptions:()=>o,fetchFile:()=>c,getCreateFFmpegCore:()=>s});const o={corePath:`https://unpkg.com/@ffmpeg/core@${r(681).devDependencies["@ffmpeg/core"].substring(1)}/dist/ffmpeg-core.js`};var n=r(876),a=r(922);const i=async(e,t)=>{(0,n.log)("info",`fetch ${e}`);const r=await(await fetch(e)).arrayBuffer();(0,n.log)("info",`${e} file size = ${r.byteLength} bytes`);const o=new Blob([r],{type:t}),a=URL.createObjectURL(o);return(0,n.log)("info",`${e} blob URL = ${a}`),a},s=async e=>{let{corePath:t,workerPath:r,wasmPath:o}=e;if("undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope){if("string"!=typeof t)throw Error("corePath should be a string!");const e=new URL(t,"file:///Users/moonkyungjoe/Documents/wetube/node_modules/@ffmpeg/ffmpeg/src/browser/getCreateFFmpegCore.js").href,s=await i(e,"application/javascript"),c=await i(void 0!==o?o:e.replace("ffmpeg-core.js","ffmpeg-core.wasm"),"application/wasm"),l=await i(void 0!==r?r:e.replace("ffmpeg-core.js","ffmpeg-core.worker.js"),"application/javascript");return"undefined"==typeof createFFmpegCore?new Promise((t=>{if(globalThis.importScripts(s),"undefined"==typeof createFFmpegCore)throw Error((0,a.CREATE_FFMPEG_CORE_IS_NOT_DEFINED)(e));(0,n.log)("info","ffmpeg-core.js script loaded"),t({createFFmpegCore,corePath:s,wasmPath:c,workerPath:l})})):((0,n.log)("info","ffmpeg-core.js script is loaded already"),Promise.resolve({createFFmpegCore,corePath:s,wasmPath:c,workerPath:l}))}if("string"!=typeof t)throw Error("corePath should be a string!");const s=new URL(t,"file:///Users/moonkyungjoe/Documents/wetube/node_modules/@ffmpeg/ffmpeg/src/browser/getCreateFFmpegCore.js").href,c=await i(s,"application/javascript"),l=await i(void 0!==o?o:s.replace("ffmpeg-core.js","ffmpeg-core.wasm"),"application/wasm"),f=await i(void 0!==r?r:s.replace("ffmpeg-core.js","ffmpeg-core.worker.js"),"application/javascript");return"undefined"==typeof createFFmpegCore?new Promise((e=>{const t=document.createElement("script"),r=()=>{if(t.removeEventListener("load",r),"undefined"==typeof createFFmpegCore)throw Error((0,a.CREATE_FFMPEG_CORE_IS_NOT_DEFINED)(s));(0,n.log)("info","ffmpeg-core.js script loaded"),e({createFFmpegCore,corePath:c,wasmPath:l,workerPath:f})};t.src=c,t.type="text/javascript",t.addEventListener("load",r),document.getElementsByTagName("head")[0].appendChild(t)})):((0,n.log)("info","ffmpeg-core.js script is loaded already"),Promise.resolve({createFFmpegCore,corePath:c,wasmPath:l,workerPath:f}))},c=async e=>{let t=e;if(void 0===e)return new Uint8Array;if("string"==typeof e)if(/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(e))t=atob(e.split(",")[1]).split("").map((e=>e.charCodeAt(0)));else{const r=await fetch(new URL(e,"file:///Users/moonkyungjoe/Documents/wetube/node_modules/@ffmpeg/ffmpeg/src/browser/fetchFile.js").href);t=await r.arrayBuffer()}else(e instanceof File||e instanceof Blob)&&(t=await(r=e,new Promise(((e,t)=>{const o=new FileReader;o.onload=()=>{e(o.result)},o.onerror=e=>{let{target:{error:{code:r}}}=e;t(Error(`File could not be read! Code=${r}`))},o.readAsArrayBuffer(r)}))));var r;return new Uint8Array(t)}},518:e=>{e.exports={defaultArgs:["./ffmpeg","-nostdin","-y"],baseOptions:{log:!1,logger:()=>{},progress:()=>{},corePath:""}}},423:(e,t,r)=>{const{defaultArgs:o,baseOptions:n}=r(518),a=r(491),{defaultOptions:i,getCreateFFmpegCore:s}=r(611),{version:c}=r(681),l=Error("ffmpeg.wasm is not ready, make sure you have completed load().");e.exports=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{log:t,logger:r,progress:f,...p}={...n,...i,...e};let u=null,m=null,d=null,g=null,h=!1,y=()=>{},w=t,v=f,b=0,F=0,E=!1,j=0;const L=(e,t)=>{y({type:e,message:t}),w&&console.log(`[${e}] ${t}`)},x=e=>{const[t,r,o]=e.split(":");return 60*parseFloat(t)*60+60*parseFloat(r)+parseFloat(o)},k=e=>{let{type:t,message:r}=e;L(t,r),((e,t)=>{if("string"==typeof e)if(e.startsWith("  Duration")){const r=e.split(", ")[0].split(": ")[1],o=x(r);t({duration:o,ratio:j}),(0===b||b>o)&&(b=o,E=!0)}else if(E&&e.startsWith("    Stream")){const t=e.match(/([\d.]+) fps/);if(t){const e=parseFloat(t[1]);F=b*e}else F=0;E=!1}else if(e.startsWith("frame")||e.startsWith("size")){const r=e.split("time=")[1].split(" ")[0],o=x(r),n=e.match(/frame=\s*(\d+)/);if(F&&n){const e=parseFloat(n[1]);j=Math.min(e/F,1)}else j=o/b;t({ratio:j,time:o})}else e.startsWith("video:")&&(t({ratio:1}),b=0)})(r,v),(e=>{"FFMPEG_END"===e&&null!==d&&(d(),d=null,g=null,h=!1)})(r)};return L("info",`use ffmpeg.wasm v${c}`),{setProgress:e=>{v=e},setLogger:e=>{y=e},setLogging:e=>{w=e},load:async()=>{if(L("info","load ffmpeg-core"),null!==u)throw Error("ffmpeg.wasm was loaded, you should not load it again, use ffmpeg.isLoaded() to check next time.");{L("info","loading ffmpeg-core");const{createFFmpegCore:e,corePath:t,workerPath:r,wasmPath:o}=await s(p);u=await e({mainScriptUrlOrBlob:t,printErr:e=>k({type:"fferr",message:e}),print:e=>k({type:"ffout",message:e}),locateFile:(e,t)=>{if("undefined"!=typeof window||"undefined"!=typeof WorkerGlobalScope){if(void 0!==o&&e.endsWith("ffmpeg-core.wasm"))return o;if(void 0!==r&&e.endsWith("ffmpeg-core.worker.js"))return r}return t+e}}),m=u.cwrap(p.mainName||"proxy_main","number",["number","number"]),L("info","ffmpeg-core loaded")}},isLoaded:()=>null!==u,run:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];if(L("info",`run ffmpeg command: ${t.join(" ")}`),null===u)throw l;if(h)throw Error("ffmpeg.wasm can only run one command at a time");return h=!0,new Promise(((e,r)=>{const n=[...o,...t].filter((e=>0!==e.length));d=e,g=r,m(...a(u,n))}))},exit:()=>{if(null===u)throw l;g&&g("ffmpeg has exited"),h=!1;try{u.exit(1)}catch(e){L(e.message),g&&g(e)}finally{u=null,m=null,d=null,g=null}},FS:function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];if(L("info",`run FS.${e} ${r.map((e=>"string"==typeof e?e:`<${e.length} bytes binary file>`)).join(" ")}`),null===u)throw l;{let t=null;try{t=u.FS[e](...r)}catch(t){throw"readdir"===e?Error(`ffmpeg.FS('readdir', '${r[0]}') error. Check if the path exists, ex: ffmpeg.FS('readdir', '/')`):"readFile"===e?Error(`ffmpeg.FS('readFile', '${r[0]}') error. Check if the path exists`):Error("Oops, something went wrong in FS operation.")}return t}}}}},948:(e,t,r)=>{r(390);const o=r(423),{fetchFile:n}=r(611);e.exports={createFFmpeg:o,fetchFile:n}},922:e=>{e.exports={CREATE_FFMPEG_CORE_IS_NOT_DEFINED:e=>`\ncreateFFmpegCore is not defined. ffmpeg.wasm is unable to find createFFmpegCore after loading ffmpeg-core.js from ${e}. Use another URL when calling createFFmpeg():\n\nconst ffmpeg = createFFmpeg({\n  corePath: 'http://localhost:3000/ffmpeg-core.js',\n});\n`}},876:e=>{let t=!1,r=()=>{};e.exports={logging:t,setLogging:e=>{t=e},setCustomLogger:e=>{r=e},log:(e,o)=>{r({type:e,message:o}),t&&console.log(`[${e}] ${o}`)}}},491:e=>{e.exports=(e,t)=>{const r=e._malloc(t.length*Uint32Array.BYTES_PER_ELEMENT);return t.forEach(((t,o)=>{const n=e.lengthBytesUTF8(t)+1,a=e._malloc(n);e.stringToUTF8(t,a,n),e.setValue(r+Uint32Array.BYTES_PER_ELEMENT*o,a,"i32")})),[t.length,r]}},390:e=>{var t=function(e){"use strict";var t,r=Object.prototype,o=r.hasOwnProperty,n=Object.defineProperty||function(e,t,r){e[t]=r.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",s=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function l(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(e){l=function(e,t,r){return e[t]=r}}function f(e,t,r,o){var a=t&&t.prototype instanceof y?t:y,i=Object.create(a.prototype),s=new S(o||[]);return n(i,"_invoke",{value:k(e,r,s)}),i}function p(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=f;var u="suspendedStart",m="suspendedYield",d="executing",g="completed",h={};function y(){}function w(){}function v(){}var b={};l(b,i,(function(){return this}));var F=Object.getPrototypeOf,E=F&&F(F(C([])));E&&E!==r&&o.call(E,i)&&(b=E);var j=v.prototype=y.prototype=Object.create(b);function L(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function x(e,t){function r(n,a,i,s){var c=p(e[n],e,a);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==typeof f&&o.call(f,"__await")?t.resolve(f.__await).then((function(e){r("next",e,i,s)}),(function(e){r("throw",e,i,s)})):t.resolve(f).then((function(e){l.value=e,i(l)}),(function(e){return r("throw",e,i,s)}))}s(c.arg)}var a;n(this,"_invoke",{value:function(e,o){function n(){return new t((function(t,n){r(e,o,t,n)}))}return a=a?a.then(n,n):n()}})}function k(e,t,r){var o=u;return function(n,a){if(o===d)throw new Error("Generator is already running");if(o===g){if("throw"===n)throw a;return R()}for(r.method=n,r.arg=a;;){var i=r.delegate;if(i){var s=P(i,r);if(s){if(s===h)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===u)throw o=g,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=d;var c=p(e,t,r);if("normal"===c.type){if(o=r.done?g:m,c.arg===h)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(o=g,r.method="throw",r.arg=c.arg)}}}function P(e,r){var o=r.method,n=e.iterator[o];if(n===t)return r.delegate=null,"throw"===o&&e.iterator.return&&(r.method="return",r.arg=t,P(e,r),"throw"===r.method)||"return"!==o&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+o+"' method")),h;var a=p(n,e.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,h;var i=a.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,h):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,h)}function _(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function O(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function S(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(_,this),this.reset(!0)}function C(e){if(e){var r=e[i];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,a=function r(){for(;++n<e.length;)if(o.call(e,n))return r.value=e[n],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}return{next:R}}function R(){return{value:t,done:!0}}return w.prototype=v,n(j,"constructor",{value:v,configurable:!0}),n(v,"constructor",{value:w,configurable:!0}),w.displayName=l(v,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===w||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,v):(e.__proto__=v,l(e,c,"GeneratorFunction")),e.prototype=Object.create(j),e},e.awrap=function(e){return{__await:e}},L(x.prototype),l(x.prototype,s,(function(){return this})),e.AsyncIterator=x,e.async=function(t,r,o,n,a){void 0===a&&(a=Promise);var i=new x(f(t,r,o,n),a);return e.isGeneratorFunction(r)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},L(j),l(j,c,"Generator"),l(j,i,(function(){return this})),l(j,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),r=[];for(var o in t)r.push(o);return r.reverse(),function e(){for(;r.length;){var o=r.pop();if(o in t)return e.value=o,e.done=!1,e}return e.done=!0,e}},e.values=C,S.prototype={constructor:S,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(O),!e)for(var r in this)"t"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function n(o,n){return s.type="throw",s.arg=e,r.next=o,n&&(r.method="next",r.arg=t),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],s=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=o.call(i,"catchLoc"),l=o.call(i,"finallyLoc");if(c&&l){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,h):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),h},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),O(r),h}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var o=r.completion;if("throw"===o.type){var n=o.arg;O(r)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,o){return this.delegate={iterator:C(e),resultName:r,nextLoc:o},"next"===this.method&&(this.arg=t),h}},e}(e.exports);try{regeneratorRuntime=t}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=t:Function("r","regeneratorRuntime = r")(t)}},681:e=>{"use strict";e.exports=JSON.parse('{"name":"@ffmpeg/ffmpeg","version":"0.11.6","description":"FFmpeg WebAssembly version","main":"src/index.js","types":"src/index.d.ts","directories":{"example":"examples"},"scripts":{"start":"node scripts/server.js","start:worker":"node scripts/worker-server.js","build":"rimraf dist && webpack --config scripts/webpack.config.prod.js","build:worker":"rimraf dist && webpack --config scripts/webpack.config.worker.prod.js","prepublishOnly":"npm run build","lint":"eslint src","wait":"rimraf dist && wait-on http://localhost:3000/dist/ffmpeg.dev.js","test":"npm-run-all -p -r start test:all","test:all":"npm-run-all wait test:browser:ffmpeg test:node:all","test:node":"node node_modules/mocha/bin/_mocha --exit --bail --require ./scripts/test-helper.js","test:node:all":"npm run test:node -- ./tests/*.test.js","test:browser":"mocha-headless-chrome -a allow-file-access-from-files -a incognito -a no-sandbox -a disable-setuid-sandbox -a disable-logging -t 300000","test:browser:ffmpeg":"npm run test:browser -- -f ./tests/ffmpeg.test.html"},"browser":{"./src/node/index.js":"./src/browser/index.js"},"repository":{"type":"git","url":"git+https://github.com/ffmpegwasm/ffmpeg.wasm.git"},"keywords":["ffmpeg","WebAssembly","video"],"author":"Jerome Wu <jeromewus@gmail.com>","license":"MIT","bugs":{"url":"https://github.com/ffmpegwasm/ffmpeg.wasm/issues"},"engines":{"node":">=12.16.1"},"homepage":"https://github.com/ffmpegwasm/ffmpeg.wasm#readme","dependencies":{"is-url":"^1.2.4","node-fetch":"^2.6.1","regenerator-runtime":"^0.13.7","resolve-url":"^0.2.1"},"devDependencies":{"@babel/core":"^7.12.3","@babel/preset-env":"^7.12.1","@ffmpeg/core":"^0.11.0","@types/emscripten":"^1.39.4","babel-eslint":"^10.1.0","babel-loader":"^8.1.0","chai":"^4.2.0","cors":"^2.8.5","eslint":"^7.12.1","eslint-config-airbnb-base":"^14.1.0","eslint-plugin-import":"^2.22.1","express":"^4.17.1","mocha":"^8.2.1","mocha-headless-chrome":"^2.0.3","npm-run-all":"^4.1.5","wait-on":"^5.3.0","webpack":"^5.3.2","webpack-cli":"^4.1.0","webpack-dev-middleware":"^4.0.0"}}')}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,r),a.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{"use strict";var e=r(948);const t=document.getElementById("actionBtn"),o=document.getElementById("preview");let n,a,i;const s="recording.webm",c="output.mp4",l="thumbnail.jpg",f=(e,t)=>{const r=document.createElement("a");r.href=e,r.download=t,document.body.appendChild(r),r.click()},p=async()=>{t.removeEventListener("click",p),t.innerText="Processing..",t.disabled=!0;const r=(0,e.createFFmpeg)({log:!0});await r.load(),r.FS("writeFile",s,await(0,e.fetchFile)(i)),await r.run("-i",s,"-r","60",c),await r.run("-i",s,"-ss","00:00:01","-frames:v","1",l);const o=r.FS("readFile",c),n=r.FS("readFile",l),a=new Blob([o.buffer],{type:"video/mp4"}),m=new Blob([n.buffer],{type:"image/jpg"}),d=URL.createObjectURL(a),g=URL.createObjectURL(m);f(d,"MyRecording.mp4"),f(g,"MyThumbnai.jpg"),r.FS("unlink",s),r.FS("unlink",c),r.FS("unlink",l),URL.revokeObjectURL(d),URL.revokeObjectURL(g),URL.revokeObjectURL(i),t.innerText="Start Recording Again...",t.disabled=!1,t.addEventListener("click",u)},u=()=>{t.innerText="Recording",t.disabled=!0,t.removeEventListener("click",u),a=new MediaRecorder(n,{mimeType:"video/webm"}),a.ondataavailable=e=>{i=URL.createObjectURL(e.data),o.srcObject=null,o.src=i,o.loop=!0,o.play(),t.innerText="Download",t.disabled=!1,t.addEventListener("click",p)},a.start(),setTimeout((()=>{a.stop()}),4e3)};(async()=>{n=await navigator.mediaDevices.getUserMedia({audio:!1,video:{width:1024,height:576}}),o.srcObject=n,o.play()})(),t.addEventListener("click",u)})()})();