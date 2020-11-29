function textChangeListener(evt) {
  var id = evt.target.id;
  var text = evt.target.value;
  if (id == "topLineText") {
    window.topLineText = text;
  } else {
    window.bottomLineText = text;
  }
  redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}

function redrawMeme(image, topLine, bottomLine) {
  // Get Canvas2DContext
  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  // Your code here
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  ctx.font = "36px Impact";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.fillText(topLine, canvas.width / 2, 40);
  ctx.strokeText(topLine, canvas.width / 2, 40);
  ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 20);
  ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 20);
}

function saveFile() {
  //window.open(document.querySelector('canvas').toDataURL());
  let canvas = document.querySelector("canvas");
  let img = canvas.toDataURL();
  document.querySelector(".main").style.display = "none";
  document.querySelector("#outputModal").style.display = "block";
  let meme = document.querySelector("#result");
  meme.setAttribute("src", img);
}

function dnld() {
  let canvas = document.querySelector("canvas");
  let img = canvas.toDataURL();
  let a = document.createElement("a");
  a.href = img;
  a.download = "image.png";
  a.click();
}

function back() {
  let outMod = document.querySelector("#outputModal");
  let cont = document.querySelector(".main");
  outMod.style.display = "none";
  cont.style.display = "flex";
  document.getElementById("result").setAttribute("src", "");
}

function handleFileSelect(evt) {
  var canvasWidth = 500;
  var canvasHeight = 500;
  var file = evt.target.files[0];
  var reader = new FileReader();
  reader.onload = function (fileObject) {
    var data = fileObject.target.result;
    // Create an image object
    var image = new Image();
    image.onload = function () {
      window.imageSrc = this;
      redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
    };
    // Set image data to background image.
    image.src = data;
    //console.log(fileObject.target.result);
  };
  reader.readAsDataURL(file);
}
window.topLineText = null;
window.bottomLineText = null;
var input1 = document.getElementById("topLineText");
var input2 = document.getElementById("bottomLineText");
input1.oninput = textChangeListener;
input2.oninput = textChangeListener;
document
  .getElementById("file")
  .addEventListener("change", handleFileSelect, false);
document.querySelector("#saveBtn").addEventListener("click", saveFile, false);
