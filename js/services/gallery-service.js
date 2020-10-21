'use strict';

var gKeywords = {};
var gImgs;


function getImgsToShow() {
    console.log('Gettingg some imgs');
    gImgs = _createImgs();
    console.log(gImgs)
    return gImgs;
}



function _createImg(url, keywords) {
    return {
        id: makeId(20),
        url,
        keywords
    }
}

function _createImgs() {
    var imgs = [];
    for (let i = 0; i < 18; i++) {
        imgs.push(_createImg(`img/meme-imgs/${i+1}.jpg`, ['happy']));
    }
    return imgs;
}