var subjekte = ["Niemand ", "Star Platinum ", "DIO ", "Joseph ", "Killer Queen "];
var verben = ["dodged ", "schlägt ", "hat ", "isst ", "berührt "];
var objekte = ["Emerald Splash", "Gegner", "Za Warudo", "Squid Ink Noodles", "Türen"];
function fisherYatesShuffle(_stringarray) {
    for (var i = 0; i < _stringarray.length - 2; i++) {
        var length_1 = _stringarray.length;
        var j = Math.floor(Math.random() * (length_1 - i) + i);
        var alt = _stringarray[i];
        _stringarray[i] = _stringarray[j];
        _stringarray[j] = alt;
    }
    return _stringarray;
}
subjekte = fisherYatesShuffle(subjekte);
verben = fisherYatesShuffle(verben);
objekte = fisherYatesShuffle(objekte);
function getVerse(_index) {
    var ausgabe = "";
    ausgabe += subjekte[_index];
    ausgabe += verben[_index];
    ausgabe += objekte[_index];
    return ausgabe;
}
for (var index = 0; index < subjekte.length; index++) {
    console.log(getVerse(index));
}
