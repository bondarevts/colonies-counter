var MARK_FUNCTION = drawCircle;
var totalColonies = 0;

var canvas = SVG('canvas-wrapper').size(400, 100);
var text = canvas.text("Load an image");

canvas.click(markColony);
canvas.touchstart(touchMarkColony);

function setTotalColoniesCount(count) {
    totalColonies = count;
    document.getElementById("colonies-counter").innerText = totalColonies;
}

function markColony(e) {
    var x = e.pageX - canvas.parent().offsetLeft;
    var y = e.pageY - canvas.parent().offsetTop;
    MARK_FUNCTION(x, y);
    setTotalColoniesCount(totalColonies + 1);
}

function touchMarkColony(e) {
    markColony(e.touches[0]);
    e.preventDefault();
}

function drawImage(img) {
    setTotalColoniesCount(0);
    canvas.image(img).loaded(function(loader) {
        canvas.size(loader.width, loader.height);
    });
}

function loadTestImage() {
    drawImage("imgs/test_image.jpg");
}

function loadImage() {
    var file = document.getElementById('image-browser').files[0];
    var reader = new FileReader();
    reader.onload = function() {
        drawImage(reader.result);
    };
    reader.readAsDataURL(file);
}
