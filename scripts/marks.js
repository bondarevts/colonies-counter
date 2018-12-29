function drawCircle(x, y) {
    var diameter = MARK_SIZE;
    var radius = diameter / 2;
    return canvas.circle(diameter).fill("rgba(0, 0, 255, 0.4)").move(x - radius, y - radius);
}

function drawCrossMark(x, y) {
    var group = canvas.group();
    group.line(x - MARK_SIZE/2, y - MARK_SIZE/2, x + MARK_SIZE/2, y + MARK_SIZE/2).stroke({ width: 1 });
    group.line(x + MARK_SIZE/2, y - MARK_SIZE/2, x - MARK_SIZE/2, y + MARK_SIZE/2).stroke({ width: 1 });
    return group;
}
