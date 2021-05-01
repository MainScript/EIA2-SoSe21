// HTML ELEMENTE
var submitB: HTMLButtonElement;
var anzahlPairInput: HTMLInputElement;
var sliderSpan: HTMLSpanElement;
var slider: HTMLInputElement;
var backgColorPicker: HTMLInputElement;
var kartenColorPicker: HTMLInputElement;
var textColorPicker: HTMLInputElement;
var fontPicker: HTMLSelectElement;
var optionDIV: HTMLDivElement;
var spielfeldDIV: HTMLDivElement;
var congratulationDIV: HTMLDivElement;
var scoreP: HTMLParagraphElement;
var scoreSpan: HTMLSpanElement;
var timerSpan: HTMLSpanElement;

// VARIABLEN
var anzahlPairs: number;
var kartenArray: HTMLDivElement[] = [];
var score = 0;
var clickedArray: HTMLDivElement[] = [];
var startzeit: number;
var form: FormData;

// HANDLELOAD
window.addEventListener("load", handleLoad);

function handleLoad(): void{
    submitB = <HTMLButtonElement>document.getElementById("submitB");
    // ANZAHL DER KARTEN
    anzahlPairInput = <HTMLInputElement>document.getElementById("pairInput");

    // SLIDER
    sliderSpan = <HTMLSpanElement>document.getElementById("sliderSpan");
    slider = <HTMLInputElement>document.getElementById("kartenSize");
    slider.addEventListener("input", function(): void{
        sliderSpan.innerHTML = slider.value;
    });

    // COLOR PICKER
    backgColorPicker = <HTMLInputElement>document.getElementById("backgColor");
    kartenColorPicker = <HTMLInputElement>document.getElementById("kartenColor");
    textColorPicker = <HTMLInputElement>document.getElementById("textColor");

    // FONT AUSWAHL
    fontPicker = <HTMLSelectElement>document.getElementById("kartenFont");

    // OPTION DIV
    optionDIV = <HTMLDivElement>document.getElementById("optionDIV");
    // SCOREP AND SCORESPAN
    scoreP = <HTMLParagraphElement>document.getElementById("scoreP");
    scoreSpan = <HTMLSpanElement>document.getElementById("scoreSpan");

    // SPIELFELD
    spielfeldDIV = <HTMLDivElement>document.getElementById("spielfeld");

    // CONGRATULATIONS
    congratulationDIV = <HTMLDivElement>document.getElementById("congratz");
    timerSpan = <HTMLSpanElement>document.getElementById("timerSpan");
    startzeit = Date.now();

    // START BUTTON
    submitB.addEventListener("click", createFormData);
}

function createFormData(): void {
    form = new FormData(document.forms[0]);
    console.log(form); // Das FormData-Objekt ist bei mir immer leer, daher muss ich die Werte händisch anhängen
    form.append("pairs",anzahlPairInput.value);
    form.append("size", slider.value);
    form.append("backCol", backgColorPicker.value);
    form.append("kartCol", kartenColorPicker.value);
    form.append("textCol", textColorPicker.value);
    form.append("font", fontPicker.value);
    startGame();
}

// GAME FUNCTIONS
function startGame(): void{
    
    anzahlPairs = +form.get("pairs");
    let abstand: number = 4;
    let indizes: string[] = [];

    if(anzahlPairs >= 5 && anzahlPairs <= 25){
        optionDIV.style.display = "none";
        scoreP.style.display = "block";
        spielfeldDIV.style.display = "block";
        spielfeldDIV.style.backgroundColor = form.get("backCol")+"";
        for(let i = 0; i < anzahlPairs*2; i++){
            indizes.push(i+"");
        }

        indizes = fisherYates(indizes);

        for(let i = 0; i < anzahlPairs*2; i++){
            let karte: HTMLDivElement = document.createElement("div");
            let kartensize: number = +form.get("size")*10 + 40;
            karte.style.width = kartensize+"px";
            karte.style.height = kartensize+"px";

            karte.style.position = "absolute";
            let maxwidth: number = Math.floor(1280/(kartensize+abstand));
            karte.style.left = (i % maxwidth)*kartensize + (i%maxwidth)*abstand + "px";
            karte.style.top = Math.floor(i / maxwidth)*kartensize + Math.floor(i/maxwidth)*abstand + "px";
            karte.classList.add("karte");
            karte.id = indizes[i];

            let front: HTMLDivElement = document.createElement("div");
            let frontText: HTMLParagraphElement = document.createElement("p");
            frontText.innerHTML = Math.floor(+karte.id/2)+"";
            frontText.style.color = form.get("textCol")+"";
            frontText.style.fontFamily = form.get("font")+"";
            frontText.style.fontSize = Math.floor(kartensize/2)+"px";
            frontText.style.position = "relative";
            frontText.style.top = -kartensize/2+"px";
            front.style.position = "absolute";
            front.style.width = "100%";
            front.style.height = "100%";
            front.style.textAlign = "center";
            front.appendChild(frontText);
            karte.appendChild(front);

            let ruecken: HTMLDivElement = document.createElement("div");
            ruecken.style.position = "absolute";
            ruecken.style.width = "100%";
            ruecken.style.height = "100%";
            ruecken.style.backgroundColor = form.get("kartCol")+"";
            karte.appendChild(ruecken);


            karte.addEventListener("click", function(): void{
                turncard(this);
            });
            kartenArray.push(karte);
            spielfeldDIV.appendChild(karte);
        }

    } else {
        alert("Ungültige Zahl angegeben (5 bis 25)!");
    }
}

function turncard(_karte: HTMLDivElement): void{

    if (clickedArray.length < 2){
        clickedArray.push(_karte);

        let ruecken = _karte.getElementsByTagName("div")[1];
        ruecken.style.display = "none";

        if (clickedArray.length == 2){
            setTimeout(function(): void{
                let chararray: string[] = [];
                for (let karte of clickedArray){
                    chararray.push(karte.getElementsByTagName("div")[0].getElementsByTagName("p")[0].innerHTML);
                }
                if (chararray[0] == chararray[1]) {
                    for (let karte of clickedArray){
                        karte.style.display = "none";
                    }
                    score++;
                    scoreSpan.innerHTML = score+"";
                    if (score >= anzahlPairs) {
                        endgame();
                    }
                    clickedArray = [];
                } else {
                    for (let karte of clickedArray){
                        let ruecken = karte.getElementsByTagName("div")[1];
                        ruecken.style.display = "block";
                    }
                    clickedArray = [];
                }

            }, 2000);
        }
    }
}

function fisherYates(_array: string[]): string[]{
    let out: string[] = _array;
    for (let i: number = out.length-1; i > 0; i--){
        let j: number = Math.round(Math.random()*i);
        let zwischen: string = out[i];
        out[i] = out[j];
        out[j] = zwischen;
    }
    return out;
}

function endgame(): void {
    scoreP.style.display = "none";
    spielfeldDIV.style.display = "none";
    let jetzt: number = Date.now();
    let zeitInSekunden: number = jetzt-startzeit;
    timerSpan.innerHTML = Math.floor(zeitInSekunden/1000)+"";
    congratulationDIV.style.display = "block";
}