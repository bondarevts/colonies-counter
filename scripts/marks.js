var MARK_SIZE = 10;

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 255, 0.4)";
    ctx.arc(x, y, MARK_SIZE/2, 0, 2 * Math.PI);
    ctx.fill();
}

function drawCrossMark(x, y) {
    ctx.beginPath();
    ctx.moveTo(x - MARK_SIZE/2, y - MARK_SIZE/2);
    ctx.lineTo(x + MARK_SIZE/2, y + MARK_SIZE/2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + MARK_SIZE/2, y - MARK_SIZE/2);
    ctx.lineTo(x - MARK_SIZE/2, y + MARK_SIZE/2);
    ctx.stroke();
}