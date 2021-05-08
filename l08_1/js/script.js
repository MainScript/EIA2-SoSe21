var l08_1;
(function (l08_1) {
    window.addEventListener("load", draw);
    function draw() {
        var canvas = document.querySelector("canvas");
        var crc2 = canvas.getContext("2d");
        var size = 10 * Math.ceil(Math.random() * 10);
        for (var x = 0; x < crc2.canvas.width; x += size) {
            for (var y = 0; y < crc2.canvas.height; y += size) {
                var randomNumber = Math.random();
                crc2.fillStyle = "hsl(0,0%, " + randomNumber * 100 + "%)";
                crc2.fillRect(x, y, size, size);
                if (randomNumber > 0.8) {
                    drawCircle(x, y, size / 2, crc2);
                }
                else if (randomNumber < 0.3) {
                    drawSquare(x, y, size, crc2);
                }
                else if (randomNumber > 0.4 && randomNumber < 0.6) {
                    drawTriangle(x, y, size, crc2);
                }
            }
        }
    }
    function drawCircle(_x, _y, _radius, _context) {
        _context.beginPath();
        _context.arc(_x + _radius, _y + _radius, _radius, 0, Math.PI * 2, false);
        _context.closePath();
        _context.fillStyle = "hsl(" + Math.random() * 360 + ",100%,50%)";
        _context.fill();
    }
    function drawSquare(_x, _y, _size, _context) {
        if (Math.random() <= 0.5) {
            _context.fillStyle = "hsl(" + Math.random() * 360 + ",100%,50%)";
            _context.fillRect(_x, _y, _size, _size);
        }
        else {
            _context.strokeStyle = "hsl(" + Math.random() * 360 + ",100%,50%)";
            _context.lineWidth = _size / 5;
            _context.strokeRect(_x + _context.lineWidth / 2, _y + _context.lineWidth / 2, _size - _context.lineWidth, _size - _context.lineWidth);
        }
    }
    function drawTriangle(_x, _y, _size, _context) {
        _context.beginPath();
        _context.moveTo(_x, _y);
        _context.lineTo(_x + _size, _y);
        _context.lineTo(_x + _size / 2, _y + _size);
        _context.closePath();
        _context.fillStyle = "hsl(" + Math.random() * 360 + ",100%,50%)";
        _context.fill();
    }
})(l08_1 || (l08_1 = {}));
