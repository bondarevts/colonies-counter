var diameter = 50;

var canvas = SVG('canvas-wrapper').size(400, 100).style('touch-action', 'manipulation');
var greetingText = canvas.text("Load an image");
var plateImage = null;

var file_name = "";
var marks = [];
var points = [];
var saved = true;

canvas.click(markColony);

function addMark(x, y) {
    points.push([x, y, diameter]);
    marks.push(drawCircle(x, y, diameter));
    updateColoniesCounter();
    saved = false;
}

function clearMarks() {
    marks.forEach(m => m.remove())
    marks.length = 0;
    points.length = 0;
    updateColoniesCounter();
    saved = true;
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
    saved = false;
}

function changeMarkSize() {
    diameter = parseInt(document.getElementById("mark-size").value);
    document.getElementById("mark-size-value").value = diameter;
}

function markColony(e) {
    if (plateImage != null) {
        var x = e.pageX - canvas.parent().offsetLeft;
        var y = e.pageY - canvas.parent().offsetTop;
        addMark(x, y);
    }
}

function drawImage(img) {
    if (greetingText != null) {
        greetingText.remove();
        greetingText = null;
    }
    if (plateImage != null) {
        plateImage.remove();
        plateImage = null;
    }
    clearMarks();
    plateImage = canvas.image(img);
    plateImage.loaded(function(loader) {
        canvas.size(loader.width, loader.height);
    });
    saved = true;
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

function checkMarks(e) {
    if (!canRemoveAllMarks()) {
        e.preventDefault();
        return false;
    }
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
    saved = true;
}

function undoAllClicks() {
    if (canRemoveAllMarks()) {
        clearMarks();
    }
}

function canRemoveAllMarks() {
    if (saved || points.length == 0) {
        return true;
    }
    return confirm("All marks will be removed from the current image.\nContinue?");
}
