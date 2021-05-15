"use strict";
var l08_2;
(function (l08_2) {
    let context;
    let canvas;
    let wiesenStart;
    window.addEventListener("load", draw);
    function draw() {
        canvas = document.querySelector("canvas");
        context = canvas.getContext("2d");
        wiesenStart = canvas.height / 2;
        drawSky();
        drawMountains(5);
        drawGrass();
        generateClouds();
        generateRandomFlowers(50);
        generateTrees(4);
    }
    function drawFlower(_petals, _pos, _size, _h, _w) {
        let innerPoints = [];
        let outerPoints = [];
        for (let i = 0; i < _petals; i++) {
            // Die folgenden 2 Zeilen sind von https://stackoverflow.com/questions/7198144/how-to-draw-a-n-sided-regular-polygon-in-cartesian-coordinates
            let x = _size / 5 * Math.cos(2 * Math.PI * i / _petals) + _pos[0];
            let y = _size / 5 * Math.sin(2 * Math.PI * i / _petals) + _pos[1] - _h;
            let pos = [x, y];
            innerPoints.push(pos);
            x = _size * Math.cos(2 * Math.PI * i / _petals) + _pos[0];
            y = _size * Math.sin(2 * Math.PI * i / _petals) + _pos[1] - _h;
            pos = [x, y];
            outerPoints.push(pos);
        }
        context.fillStyle = "green";
        context.fillRect(_pos[0] - _w / 2, _pos[1], _w, -_h);
        context.beginPath();
        context.moveTo(innerPoints[0][0], innerPoints[0][1]);
        for (let i = 0; i < innerPoints.length; i++) {
            context.bezierCurveTo(outerPoints[i][0], outerPoints[i][1], outerPoints[(i + 1) % innerPoints.length][0], outerPoints[(i + 1) % innerPoints.length][1], innerPoints[(i + 1) % innerPoints.length][0], innerPoints[(i + 1) % innerPoints.length][1]);
        }
        context.closePath();
        context.fillStyle = getRandomColor();
        context.fill();
        context.strokeStyle = "black";
        context.stroke();
    }
    function getRandomColor() {
        let hue = Math.round(Math.random() * 360);
        return "hsl(" + hue + ", 100%, 50%)";
    }
    function generateRandomFlowers(_count) {
        for (let i = 0; i < _count; i++) {
            let petalCnt = Math.ceil(Math.random() * 3) + 4;
            let maxsize = canvas.width / 18;
            let size = Math.ceil(Math.random() * maxsize) + maxsize / 5;
            let posX = Math.random() * (canvas.width - size) + size;
            let h = Math.floor(Math.random() * canvas.height / 8) + size;
            let posY = Math.random() * (canvas.height - (size + h + wiesenStart)) + size + h + wiesenStart;
            drawFlower(petalCnt, [posX, posY], size, h, h / 20);
        }
    }
    function drawSky() {
        context.fillStyle = "lightblue";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    function drawGrass() {
        context.fillStyle = "darkgreen";
        context.fillRect(0, wiesenStart + 1, canvas.width - 1, canvas.height - 1);
        context.strokeRect(0, wiesenStart, canvas.width, canvas.height);
    }
    function drawMountains(_spikes) {
        let mountainCoordinates = [[0, wiesenStart + 1]];
        let prevx = mountainCoordinates[0][0];
        for (let i = 1; i < _spikes * 2; i++) {
            let x = prevx + Math.random() * ((canvas.width - prevx) / (_spikes / 2));
            prevx = x;
            let y = Math.random() * wiesenStart;
            let pos = [x, y];
            mountainCoordinates.push(pos);
        }
        mountainCoordinates[mountainCoordinates.length - 1] = [canvas.width, wiesenStart + 1];
        context.beginPath();
        context.moveTo(mountainCoordinates[0][0], mountainCoordinates[0][1]);
        for (let i = 1; i < mountainCoordinates.length; i++) {
            context.lineTo(mountainCoordinates[i][0], mountainCoordinates[i][1]);
        }
        context.fillStyle = "lightgrey";
        context.closePath();
        context.fill();
        context.stroke();
    }
    function generateClouds() {
        let x = 0;
        let r = Math.round(Math.random() * canvas.width / 50) + 10;
        context.beginPath();
        while (x < canvas.width) {
            context.arc(x, 0, r, Math.PI, 0, true);
            x += r / 2;
            r = Math.round(Math.random() * canvas.width / 50) + 10;
            x += r / 2;
        }
        context.fillStyle = "white";
        context.fill();
    }
    function drawTrees() {
        let h = Math.random() * (canvas.height / 4) + canvas.height / 2;
        let w = h / 20;
        let pos = [Math.random() * canvas.width, canvas.height];
        context.beginPath();
        context.fillStyle = "#382900";
        context.fillRect(pos[0], pos[1], w, -h);
        context.closePath();
        context.beginPath();
        context.arc(pos[0] + w / 2, pos[1] - h, h / 3, 0, 2 * Math.PI);
        context.fillStyle = "green";
        context.fill();
        context.stroke();
    }
    function generateTrees(_cnt) {
        for (let i = 0; i < _cnt; i++) {
            drawTrees();
        }
    }
})(l08_2 || (l08_2 = {}));
//# sourceMappingURL=script.js.map