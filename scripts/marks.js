var MARK_SIZE = 50;

function drawCircle(x, y) {
    var diameter = MARK_SIZE;
    var radius = diameter / 2;
    canvas.circle(diameter).fill("rgba(0, 0, 255, 0.4)").move(x - radius, y - radius);
}

function drawCrossMark(x, y) {
    canvas.line(x - MARK_SIZE/2, y - MARK_SIZE/2, x + MARK_SIZE/2, y + MARK_SIZE/2).stroke({ width: 1 });
    canvas.line(x + MARK_SIZE/2, y - MARK_SIZE/2, x - MARK_SIZE/2, y + MARK_SIZE/2).stroke({ width: 1 });
}