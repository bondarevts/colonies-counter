'use strict';
var diameter = 50;
var file_name = null;
var marks = [];
var points = [];
var saved = true;

var ns = 'http://www.w3.org/2000/svg'
var div = document.getElementById('canvas-wrapper')
var svg = document.createElementNS(ns, 'svg')
svg.setAttributeNS(null, 'width', '100%')
svg.setAttributeNS(null, 'height', '100%')
svg.setAttributeNS(null, 'style', 'touch-action: manipulation;');
svg.addEventListener('click', markColony);
div.appendChild(svg)

var plateImage = document.createElementNS(ns, 'image');
plateImage.addEventListener('load', function(e) {
    var size = plateImage.getBBox();
    svg.setAttribute('width', size.width);
    svg.setAttribute('height', size.height);
})
svg.appendChild(plateImage);

function addMark(x, y) {
    points.push([x, y, diameter]);
    marks.push(drawCircle(x, y, diameter));
    updateColoniesCounter();
    saved = false;
}

function clearMarks() {
    marks.forEach(m => svg.removeChild(m));
    marks.length = 0;
    points.length = 0;
    updateColoniesCounter();
    saved = true;
}

function updateColoniesCounter() {
    document.getElementById('colonies-counter').innerText = points.length;
}

function undoClick() {
    if (points.length == 0) {
        return;
    }
    points.pop();
    svg.removeChild(marks.pop());
    updateColoniesCounter();
    saved = false;
}

function changeMarkSize() {
    diameter = parseInt(document.getElementById('mark-size').value);
    document.getElementById('mark-size-value').value = diameter;
}

function markColony(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    addMark(x, y);
}

function drawImage(img) {
    if (!plateImage.getAttributeNS(null, 'href')) {
        document.getElementById('image-working-area').style.display = 'block';
    }  else {
        clearMarks();
    }
    plateImage.setAttributeNS(null, 'href', img);
    saved = true;
}

function loadTestImage() {
    file_name = 'test_image.jpg';
    drawImage('imgs/' + file_name);
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
    var circle = document.createElementNS(ns, 'circle');
    circle.setAttributeNS(null, 'r', radius);
    circle.setAttributeNS(null, 'cx', x);
    circle.setAttributeNS(null, 'cy', y);
    circle.setAttributeNS(null, 'fill', 'rgba(0, 0, 255, 0.4)');
    svg.appendChild(circle);
    return circle;
}

function pointsToCSV() {
    return points.map(p => p.join(',')).join('\n');
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
    download(file_name + '.csv', pointsToCSV());
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
    return confirm('All marks will be removed from the current image.\nContinue?');
}
