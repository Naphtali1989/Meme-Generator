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

function loadImageFromInput(ev) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function(event) {
        var img = new Image();
        // img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;

        var randWords = [];
        for (let i = 0; i < getRandomInt(0, 5); i++) {
            randWords.push(searchWords[getRandomInt(0, 5)])
        }
        gImgs.push(_createImg(img.src, randWords));
        console.log(img)
        img.onload = onInitEditor.bind(null, img)
    }
    reader.readAsDataURL(ev.target.files[0]);
    console.log(gImgs)
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