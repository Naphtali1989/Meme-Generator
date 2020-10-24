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
var gMemes;


function getImgsToShow() {
    if (!searchWords.includes(gSearchBy)) return gImgs;
    var imgs = gImgs.filter(img => img.keywords.includes(gSearchBy));
    gKeywords[gSearchBy] += 1;
    return imgs;
}

function getImgById(id) {
    return gImgs.find(img => img.id === id);
}

function setSearch(value) {
    gSearchBy = value.toLowerCase();
    console.log(gSearchBy)
}

function getSearchWords() {
    var keywords = Object.entries(gKeywords);
    keywords.sort((a, b) => b[1] - a[1]);
    return keywords;
}

function loadImageFromInput(ev) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function(event) {
        var img = new Image();
        img.src = event.target.result;

        var randWords = [];
        for (let i = 0; i < getRandomInt(0, 5); i++) {
            randWords.push(searchWords[getRandomInt(0, 5)])
        }
        gImgs.push(_createImg(img.src, randWords));
        img.onload = onInitEditor.bind(null, img.id)
    }
    reader.readAsDataURL(ev.target.files[0]);
    console.log(gImgs)
}

function getSavedMemesToShow() {
    var memes = getSavedMemes();
    gMemes = memes;
    return memes;
}

function getSavedMemeById(id) {
    return gMemes.find(meme => meme.id === id)
}

function getImgByUrl(url) {
    return gImgs.find(img => img.url === url)
}

function openSavedEditor(id) {
    var currMeme = getSavedMemeById(id);
    var img = getImgByUrl(currMeme.img.url)
    setSavedMeme(currMeme);
    onInitEditor(img.id);
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
    for (let i = 0; i < 108; i++) {
        var randWords = [];
        for (let i = 0; i < getRandomInt(0, 5); i++) {
            randWords.push(searchWords[getRandomInt(0, 5)])
        }
        imgs.push(_createImg(`img/meme-imgs/${i+1}.jpg`, randWords));
    }
    return imgs;
}