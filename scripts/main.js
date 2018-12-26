var MARK_SIZE = 10;
var CANVAS_SIZE = {x: 400, y: 400};



var canvas = document.createElement('canvas');
var ctx = canvas.getContext("2d");
canvas.id = 'canvas';
canvas.width  = 400;
canvas.height = 100;

document.body.appendChild(canvas);

ctx.font = "30px Arial";
ctx.fillText("Load an image", 80, 70);

var totalColonies = 0;

function setTotalColoniesCount(count) {
    totalColonies = count;
    document.getElementById("colonies-counter").innerText = totalColonies;
}

function markColony(e) {
    var rect = canvas.getBoundingClientRect();
    var x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    var y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    console.log(x + " " + y);
    if (x >= 0 && y >= 0 && x <= canvas.width && y <= canvas.height) {
        drawCircle(x, y);
        setTotalColoniesCount(totalColonies + 1);
    }
}

function touchMarkColony(e) {
    markColony(e.touches[0]);
}

function drawImageOnLoad(img) {
    return function() {
        setTotalColoniesCount(0);
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
    }
}

window.onload = function() {
    document.addEventListener("touchstart", touchMarkColony);
    document.addEventListener('mousedown', markColony);
}

function loadTestImage() {
    var img = new Image();
    img.src = "imgs/test_image.jpg";
    img.onload = drawImageOnLoad(img);
}

function loadImage() {
    var img;

    var input = document.getElementById('image-browser');
    var file = input.files[0];
    var fr = new FileReader();
    fr.onload = createImage;
    fr.readAsDataURL(file);

    function createImage() {
        img = new Image();
        img.onload = drawImageOnLoad(img);
        img.src = fr.result;
    }
}


