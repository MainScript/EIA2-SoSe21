namespace l08_2 {
    let context: CanvasRenderingContext2D;
    let canvas: HTMLCanvasElement;
    let wiesenStart: number;

    window.addEventListener("load", draw);

    function draw(): void {
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

    function drawFlower(_petals: number, _pos: number[], _size: number, _h: number, _w: number): void {
        let innerPoints: number[][] = [];
        let outerPoints: number[][] = [];
        for (let i: number = 0; i < _petals; i++) {
            // Die folgenden 2 Zeilen sind von https://stackoverflow.com/questions/7198144/how-to-draw-a-n-sided-regular-polygon-in-cartesian-coordinates
            let x: number = _size / 5 * Math.cos(2 * Math.PI * i / _petals) + _pos[0];
            let y: number = _size / 5 * Math.sin(2 * Math.PI * i / _petals) + _pos[1] - _h;
            let pos: number[] = [x, y];
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
        for (let i: number = 0; i < innerPoints.length; i++) {
            context.bezierCurveTo(outerPoints[i][0], outerPoints[i][1], outerPoints[(i + 1) % innerPoints.length][0], outerPoints[(i + 1) % innerPoints.length][1], innerPoints[(i + 1) % innerPoints.length][0], innerPoints[(i + 1 ) % innerPoints.length][1]);
        }
        context.closePath();
        context.fillStyle = getRandomColor();
        context.fill();
        context.strokeStyle = "black";
        context.stroke();
    }

    function getRandomColor(): string {
        let hue: number = Math.round(Math.random() * 360);
        return "hsl(" + hue + ", 100%, 50%)";
    }

    function generateRandomFlowers(_count: number): void {
        for (let i: number = 0; i < _count; i++) {
            let petalCnt: number = Math.ceil(Math.random() * 3) + 4;
            let maxsize: number = canvas.width / 18;
            let size: number = Math.ceil(Math.random() * maxsize) + maxsize / 5;
            let posX: number = Math.random() * (canvas.width - size) + size;
            let h: number = Math.floor(Math.random() * canvas.height / 8) + size;
            let posY: number = Math.random() * (canvas.height - (size + h + wiesenStart)) + size + h + wiesenStart;
            drawFlower(petalCnt, [posX, posY], size, h, h / 20);
        }
    }

    function drawSky(): void {
        context.fillStyle = "lightblue";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawGrass(): void {
        context.fillStyle = "darkgreen";
        context.fillRect(0, wiesenStart + 1, canvas.width - 1, canvas.height - 1);
        context.strokeRect(0, wiesenStart, canvas.width, canvas.height);
    }

    function drawMountains(_spikes: number): void {
        let mountainCoordinates: number[][] = [[0, wiesenStart + 1]];
        let prevx: number = mountainCoordinates[0][0];
        for (let i: number = 1; i < _spikes * 2; i++) {
            let x: number = prevx + Math.random() * ((canvas.width - prevx) / (_spikes / 2));
            prevx = x;
            let y: number = Math.random() * wiesenStart;
            let pos: number[] = [x, y];
            mountainCoordinates.push(pos);
        }
        mountainCoordinates[mountainCoordinates.length - 1] = [canvas.width, wiesenStart + 1];
        context.beginPath();
        context.moveTo(mountainCoordinates[0][0], mountainCoordinates[0][1]);
        for (let i: number = 1; i < mountainCoordinates.length; i++) {
            context.lineTo(mountainCoordinates[i][0], mountainCoordinates[i][1]);
        }
        context.fillStyle = "lightgrey";
        context.closePath();
        context.fill();
        context.stroke();
    }

    function generateClouds(): void {
        let x: number = 0;
        let r: number = Math.round(Math.random() * canvas.width / 50) + 10;
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

    function drawTrees(): void {
        let h: number = Math.random() * (canvas.height / 4) + canvas.height / 2;
        let w: number = h / 20;
        let pos: number[] = [Math.random() * canvas.width, canvas.height];

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

    function generateTrees(_cnt: number): void {
        for (let i: number = 0; i < _cnt; i++) {
            drawTrees();
        }
    }
}