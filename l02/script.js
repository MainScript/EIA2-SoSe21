var L02;
(function (L02) {
    var mouseSpan;
    var div0;
    var div1;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
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
    }
    ;
    function setInfoBox(_event) {
        var x = _event.clientX;
        var y = _event.clientY;
        var innerString = "x: " + x + " y: " + y;
        mouseSpan.style.left = x + "px";
        mouseSpan.style.top = y + "px";
        mouseSpan.innerHTML = innerString;
    }
    ;
    function logInfo(_event) {
        console.log(_event.type);
        console.log(_event.target);
        console.log(_event.currentTarget);
        console.log(_event);
    }
    ;
})(L02 || (L02 = {}));
