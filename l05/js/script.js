// HTML ELEMENTE
var submitB;
var anzahlPairInput;
var sliderSpan;
var slider;
var backgColorPicker;
var kartenColorPicker;
var textColorPicker;
var fontPicker;
var optionDIV;
var spielfeldDIV;
var congratulationDIV;
var scoreP;
var scoreSpan;
var timerSpan;
// VARIABLEN
var anzahlPairs;
var kartenArray = [];
var score = 0;
var clickedArray = [];
var startzeit;
var form;
// HANDLELOAD
window.addEventListener("load", handleLoad);
function handleLoad() {
    submitB = document.getElementById("submitB");
    // ANZAHL DER KARTEN
    anzahlPairInput = document.getElementById("pairInput");
    // SLIDER
    sliderSpan = document.getElementById("sliderSpan");
    slider = document.getElementById("kartenSize");
    slider.addEventListener("input", function () {
        sliderSpan.innerHTML = slider.value;
    });
    // COLOR PICKER
    backgColorPicker = document.getElementById("backgColor");
    kartenColorPicker = document.getElementById("kartenColor");
    textColorPicker = document.getElementById("textColor");
    // FONT AUSWAHL
    fontPicker = document.getElementById("kartenFont");
    // OPTION DIV
    optionDIV = document.getElementById("optionDIV");
    // SCOREP AND SCORESPAN
    scoreP = document.getElementById("scoreP");
    scoreSpan = document.getElementById("scoreSpan");
    // SPIELFELD
    spielfeldDIV = document.getElementById("spielfeld");
    // CONGRATULATIONS
    congratulationDIV = document.getElementById("congratz");
    timerSpan = document.getElementById("timerSpan");
    startzeit = Date.now();
    // START BUTTON
    submitB.addEventListener("click", createFormData);
}
function createFormData() {
    form = new FormData(document.forms[0]);
    console.log(form); // Das FormData-Objekt ist leer, daher muss ich die Werte händisch anhängen
    form.append("pairs", anzahlPairInput.value);
    form.append("size", slider.value);
    form.append("backCol", backgColorPicker.value);
    form.append("kartCol", kartenColorPicker.value);
    form.append("textCol", textColorPicker.value);
    form.append("font", fontPicker.value);
    startGame();
}
// GAME FUNCTIONS
function startGame() {
    anzahlPairs = +form.get("pairs");
    var abstand = 4;
    var indizes = [];
    if (anzahlPairs >= 5 && anzahlPairs <= 25) {
        optionDIV.style.display = "none";
        scoreP.style.display = "block";
        spielfeldDIV.style.display = "block";
        spielfeldDIV.style.backgroundColor = form.get("backCol") + "";
        for (var i = 0; i < anzahlPairs * 2; i++) {
            indizes.push(i + "");
        }
        indizes = fisherYates(indizes);
        for (var i = 0; i < anzahlPairs * 2; i++) {
            var karte = document.createElement("div");
            var kartensize = +form.get("size") * 10 + 40;
            karte.style.width = kartensize + "px";
            karte.style.height = kartensize + "px";
            karte.style.position = "absolute";
            var maxwidth = Math.floor(1280 / (kartensize + abstand));
            karte.style.left = (i % maxwidth) * kartensize + (i % maxwidth) * abstand + "px";
            karte.style.top = Math.floor(i / maxwidth) * kartensize + Math.floor(i / maxwidth) * abstand + "px";
            karte.classList.add("karte");
            karte.id = indizes[i];
            var front = document.createElement("div");
            var frontText = document.createElement("p");
            frontText.innerHTML = Math.floor(+karte.id / 2) + "";
            frontText.style.color = form.get("textCol") + "";
            frontText.style.fontFamily = form.get("font") + "";
            frontText.style.fontSize = Math.floor(kartensize / 2) + "px";
            frontText.style.position = "relative";
            frontText.style.top = -kartensize / 2 + "px";
            front.style.position = "absolute";
            front.style.width = "100%";
            front.style.height = "100%";
            front.style.textAlign = "center";
            front.appendChild(frontText);
            karte.appendChild(front);
            var ruecken = document.createElement("div");
            ruecken.style.position = "absolute";
            ruecken.style.width = "100%";
            ruecken.style.height = "100%";
            ruecken.style.backgroundColor = form.get("kartCol") + "";
            karte.appendChild(ruecken);
            karte.addEventListener("click", function () {
                turncard(this);
            });
            kartenArray.push(karte);
            spielfeldDIV.appendChild(karte);
        }
    }
    else {
        alert("Ungültige Zahl angegeben (5 bis 25)!");
    }
}
function turncard(_karte) {
    if (clickedArray.length < 2) {
        clickedArray.push(_karte);
        var ruecken = _karte.getElementsByTagName("div")[1];
        ruecken.style.display = "none";
        if (clickedArray.length == 2) {
            setTimeout(function () {
                var chararray = [];
                for (var _i = 0, clickedArray_1 = clickedArray; _i < clickedArray_1.length; _i++) {
                    var karte = clickedArray_1[_i];
                    chararray.push(karte.getElementsByTagName("div")[0].getElementsByTagName("p")[0].innerHTML);
                }
                if (chararray[0] == chararray[1]) {
                    for (var _a = 0, clickedArray_2 = clickedArray; _a < clickedArray_2.length; _a++) {
                        var karte = clickedArray_2[_a];
                        karte.style.display = "none";
                    }
                    score++;
                    scoreSpan.innerHTML = score + "";
                    if (score >= anzahlPairs) {
                        endgame();
                    }
                    clickedArray = [];
                }
                else {
                    for (var _b = 0, clickedArray_3 = clickedArray; _b < clickedArray_3.length; _b++) {
                        var karte = clickedArray_3[_b];
                        var ruecken_1 = karte.getElementsByTagName("div")[1];
                        ruecken_1.style.display = "block";
                    }
                    clickedArray = [];
                }
            }, 2000);
        }
    }
}
function fisherYates(_array) {
    var out = _array;
    for (var i = out.length - 1; i > 0; i--) {
        var j = Math.round(Math.random() * i);
        var zwischen = out[i];
        out[i] = out[j];
        out[j] = zwischen;
    }
    return out;
}
function endgame() {
    scoreP.style.display = "none";
    spielfeldDIV.style.display = "none";
    var jetzt = Date.now();
    var zeitInSekunden = jetzt - startzeit;
    timerSpan.innerHTML = Math.floor(zeitInSekunden / 1000) + "";
    congratulationDIV.style.display = "block";
}
