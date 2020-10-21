'use strict';

var gKeywords = {};
var gImgs;


function getImgsToShow() {
    gImgs = _createImgs();
    return gImgs;
}


function getImgById(id) {
    return gImgs.find(id => id)
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
    for (let i = 0; i < 3; i++) {
        imgs.push(_createImg(`img/meme-imgs/${i+1}.jpg`, ['happy']));
    }
    return imgs;
}