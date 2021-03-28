let subjekte: string[] = ["Niemand ", "Star Platinum ", "DIO " , "Joseph ", "Killer Queen "];
let verben: string[] = ["dodged ", "schlägt ", "hat ", "isst ", "berührt "];
let objekte: string[] = ["Emerald Splash", "Gegner", "Za Warudo", "Squid Ink Noodles", "Türen"];

function fisherYatesShuffle(_stringarray: string[]){
    for (let i = 0; i < _stringarray.length-2; i++){
        let length: number = _stringarray.length;
        let j: number = Math.floor(Math.random() * (length - i) + i);
        let alt: string = _stringarray[i];
        _stringarray[i] = _stringarray[j];
        _stringarray[j] = alt;
    }
    return _stringarray;
}

subjekte = fisherYatesShuffle(subjekte);
verben = fisherYatesShuffle(verben);
objekte = fisherYatesShuffle(objekte);

function getVerse(_index: number){
    let ausgabe: string = "";
    ausgabe += subjekte[_index];
    ausgabe += verben[_index];
    ausgabe += objekte[_index];
    return ausgabe;
}

for(let index = 0; index < subjekte.length; index++) {
    console.log(getVerse(index));
}