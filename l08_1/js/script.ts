namespace l08_1{
    window.addEventListener("load", draw);

    function draw(){
        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
        let size: number = 10*Math.ceil(Math.random()*10);
        for(let x = 0; x < crc2.canvas.width; x+=size){
            for(let y = 0; y < crc2.canvas.height; y+=size){
                let randomNumber: number = Math.random();
                crc2.fillStyle = "hsl(0,0%, "+randomNumber*100+"%)";
                crc2.fillRect(x,y,size,size);
                if(randomNumber > 0.8){
                    drawCircle(x,y,size/2,crc2);
                } else if(randomNumber < 0.3) {
                    drawSquare(x,y,size,crc2);
                } else if(randomNumber > 0.4 && randomNumber < 0.6){
                    drawTriangle(x,y,size,crc2);
                }
            }
        }
    }

    function drawCircle(_x: number, _y: number, _radius: number, _context: CanvasRenderingContext2D){
        _context.beginPath();
        _context.arc(_x+_radius,_y+_radius,_radius,0,Math.PI*2,false);
        _context.closePath();
        _context.fillStyle = "hsl("+Math.random()*360+",100%,50%)";
        _context.fill();
    }

    function drawSquare(_x: number, _y: number, _size: number, _context: CanvasRenderingContext2D){
        if (Math.random() <= 0.5){
            _context.fillStyle = "hsl("+Math.random()*360+",100%,50%)";
            _context.fillRect(_x,_y,_size,_size);
        } else {
            _context.strokeStyle = "hsl("+Math.random()*360+",100%,50%)";
            _context.lineWidth = _size/5;
            _context.strokeRect(_x+_context.lineWidth/2,_y+_context.lineWidth/2,_size-_context.lineWidth, _size-_context.lineWidth);
        }
    }

    function drawTriangle(_x: number, _y: number, _size: number, _context: CanvasRenderingContext2D){
        _context.beginPath();
        _context.moveTo(_x,_y);
        _context.lineTo(_x+_size,_y);
        _context.lineTo(_x+_size/2,_y+_size);
        _context.closePath();
        _context.fillStyle = "hsl("+Math.random()*360+",100%,50%)";
        _context.fill();
    }
}