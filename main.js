var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");
var fullscreenButton = document.querySelector("#unity-fullscreen-button");
var warningBanner = document.querySelector("#unity-warning");

var tips = document.querySelector(".tips");
document.addEventListener("DOMContentLoaded", function () {
let tips = [
    "just wait...",
    "please wait"
];

let currentTipIndex = Math.floor(Math.random() * tips.length);
const tipElement = document.getElementById("tip-text");
let tipInterval;

tipElement.textContent = tips[currentTipIndex];

function rotateTips() {
    tipInterval = setInterval(() => {
    tipElement.style.opacity = 0;
    setTimeout(() => {
        currentTipIndex = (currentTipIndex + 1) % tips.length;
        tipElement.textContent = tips[currentTipIndex];
        tipElement.style.opacity = 1;
    }, 2000);
    }, 6000);
}

rotateTips();
});

function unityShowBanner(msg, type) {
function updateBannerVisibility() {
    warningBanner.style.display = warningBanner.children.length
    ? "block"
    : "none";
}
var div = document.createElement("div");
div.innerHTML = msg;
warningBanner.appendChild(div);
if (type == "error") div.style = "background: red; padding: 10px;";
else {
    if (type == "warning")
    div.style = "background: yellow; padding: 10px;";
    setTimeout(function () {
    warningBanner.removeChild(div);
    updateBannerVisibility();
    }, 5000);
}
updateBannerVisibility();
}

var buildUrl = "Build";
var loaderUrl = buildUrl + "/Build.loader.js";
var config = {
dataUrl: buildUrl + "/Build.data.unityweb",
frameworkUrl: buildUrl + "/Build.framework.js.unityweb",
codeUrl: buildUrl + "/Build.wasm.unityweb",
streamingAssetsUrl: "StreamingAssets",
companyName: "DefaultCompany",
productName: "SOLEIL_URP",
productVersion: "0.1.0",
showBanner: unityShowBanner,
};

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
var meta = document.createElement("meta");
meta.name = "viewport";
meta.content =
    "width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes";
document.getElementsByTagName("head")[0].appendChild(meta);
container.className = "unity-mobile";
canvas.className = "unity-mobile";
} else {
canvas.style.width = "100%";
canvas.style.height = "95%";
}

loadingBar.style.display = "block";

var script = document.createElement("script");
script.src = loaderUrl;
var myGameInstance = null;
script.onload = () => {
createUnityInstance(canvas, config, (progress) => {
    progressBarFull.style.width = 100 * progress + "%";
})
    .then((unityInstance) => {
    loadingBar.style.display = "none";
    myGameInstance = unityInstance;
    fullscreenButton.onclick = () => {
        unityInstance.SetFullscreen(1);
    };
    tips.style.display = "none";
    })
    .catch((message) => {
    alert(message);
    });
};

document.body.appendChild(script);
