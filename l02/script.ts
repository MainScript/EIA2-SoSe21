namespace L02{
    var mouseSpan: HTMLSpanElement;
    var div0: HTMLDivElement;
    var div1: HTMLDivElement;

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        mouseSpan = document.querySelector("#mouseSpan");
        div0 = document.querySelector("#div0");
        div1 = document.querySelector("#div1");

        document.addEventListener("mousemove", setInfoBox);

        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);

        document.getElementsByTagName("body")[0].addEventListener("click", logInfo);
        document.getElementsByTagName("body")[0].addEventListener("keyup", logInfo);

        div0.addEventListener("click", logInfo);
        div0.addEventListener("keyup", logInfo);

        div1.addEventListener("click", logInfo);
        div1.addEventListener("keyup", logInfo);
        
    };

    function setInfoBox(_event: MouseEvent): void {
        let x: number = _event.clientX;
        let y: number = _event.clientY;

        let innerString: string = "x: " + x + " y: " + y;

        mouseSpan.style.left = x + "px";
        mouseSpan.style.top = y + "px";
        mouseSpan.innerHTML = innerString;
    };

    function logInfo(_event: Event): void {
        console.log(_event.type);
        console.log(_event.target);
        console.log(_event.currentTarget);
        console.log(_event);
    };
}
