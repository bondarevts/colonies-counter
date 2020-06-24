var diameter = 50;

var canvas = SVG('canvas-wrapper').size(400, 100).style('touch-action', 'manipulation');
var greetingText = canvas.text("Load an image");

var file_name = "";
var marks = [];
var points = [];

canvas.click(markColony);

function addMark(x, y) {
    points.push([x, y, diameter]);
    marks.push(drawCircle(x, y, diameter));
    updateColoniesCounter();
}

function clearMarks() {
    marks.forEach(m => m.remove())
    marks.length = 0;
    points.length = 0;
    updateColoniesCounter();
}

function updateColoniesCounter() {
    document.getElementById("colonies-counter").innerText = points.length;
}

function undoClick() {
    if (points.length == 0) {
        return;
    }
    points.pop();
    marks.pop().remove();
    updateColoniesCounter();
}

function changeMarkSize() {
    diameter = parseInt(document.getElementById("mark-size").value);
    document.getElementById("mark-size-value").value = diameter;
}

function markColony(e) {
    var x = e.pageX - canvas.parent().offsetLeft;
    var y = e.pageY - canvas.parent().offsetTop;
    addMark(x, y);
}

function drawImage(img) {
    greetingText.remove();
    clearMarks();
    canvas.image(img).loaded(function(loader) {
        canvas.size(loader.width, loader.height);
    });
}

function loadTestImage() {
    file_name = "test_image.jpg";
    drawImage("imgs/" + file_name);
}

function loadImage() {
    var file = document.getElementById('image-browser').files[0];
    file_name = file.name;
    var reader = new FileReader();
    reader.onload = function() {
        drawImage(reader.result);
    };
    reader.readAsDataURL(file);
}

function drawCircle(x, y, diameter) {
    var radius = diameter / 2;
    return canvas.circle(diameter).fill("rgba(0, 0, 255, 0.4)").move(x - radius, y - radius);
}

function pointsToCSV() {
    return points.map(p => p.join(",")).join("\n");
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function downloadPoints() {
    download(file_name + ".csv", pointsToCSV());
}
