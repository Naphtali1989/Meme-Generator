'use strict';

var gSearchBy = '';

var searchWords = [
    'happy',
    'sad',
    'angry',
    'cool',
    'nice',
]
var gImgs = _createImgs();
var gKeywords = searchWords.reduce((acc, word) => {
    acc[word] = 1;
    return acc
}, {});


function getImgsToShow() {
    if (!searchWords.includes(gSearchBy)) return gImgs;
    var imgs = gImgs.filter(img => img.keywords.includes(gSearchBy));
    gKeywords[gSearchBy] += 1;
    return imgs;
}


function getImgById(id) {
    return gImgs.find(img => img.id === id)
}

function setSearch(value) {
    gSearchBy = value;
}

function getSearchWords() {
    return Object.entries(gKeywords);
}


// Private functions. please do not touch
function _createImg(url, keywords) {
    return {
        id: makeId(20),
        url,
        keywords
    }
}

function _createImgs() {
    var imgs = [];
    for (let i = 0; i < 40; i++) {
        var randWords = [];
        for (let i = 0; i < getRandomInt(0, 5); i++) {
            randWords.push(searchWords[getRandomInt(0, 5)])
        }
        imgs.push(_createImg(`img/meme-imgs/${i+1}.jpg`, randWords));
    }
    return imgs;
}