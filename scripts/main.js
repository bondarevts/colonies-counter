var MARK_FUNCTION = drawCircle;
var markSize = 50;

var canvas = SVG('canvas-wrapper').size(400, 100).style('touch-action', 'manipulation');
var text = canvas.text("Load an image");

var marks = [];

canvas.click(markColony);

function addMark(x, y) {
    marks.push(MARK_FUNCTION(x, y));
    updateColoniesCounter();
}

function clearMarks() {
    marks.length = 0;
    updateColoniesCounter();
}

function updateColoniesCounter() {
    document.getElementById("colonies-counter").innerText = marks.length;
}

function cancel() {
    if (marks.length == 0) {
        return;
    }
    var figure = marks.pop();
    figure.remove();
    updateColoniesCounter();
}

function changeMarkSize() {
    console.log(document.getElementById("mark-size").value);
    markSize = parseInt(document.getElementById("mark-size").value);
    document.getElementById("mark-size-value").value = markSize;
}

function markColony(e) {
    var x = e.pageX - canvas.parent().offsetLeft;
    var y = e.pageY - canvas.parent().offsetTop;
    addMark(x, y);
}

function drawImage(img) {
    clearMarks();
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
