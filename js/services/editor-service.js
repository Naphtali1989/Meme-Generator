'use strict';

var gSize = { x: 0, y: 0 }
var gMeme = {
    selectedImgId: '',
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat falafel',
        lineWidth: 1,
        size: 48,
        font: 'Impact',
        align: 'center',
        color: 'red',
        fillColor: 'white',
        posY: 50,
        posX: 0,
        isDragable: false
    }, {
        txt: 'i eat schwarma!',
        lineWidth: 1,
        size: 48,
        font: 'Impact',
        align: 'center',
        color: 'red',
        fillColor: 'white',
        posY: 0,
        posX: 100,
        isDragable: false
    }]
};


function getCurrSelectedLine() {
    return gMeme.selectedLineIdx;
}

function getPos() {
    var x = gMeme.lines[gMeme.selectedLineIdx].posX;
    var y = gMeme.lines[gMeme.selectedLineIdx].posY;
    var length = gMeme.lines[gMeme.selectedLineIdx].txt.length;
    var size = gMeme.lines[gMeme.selectedLineIdx].size;
    return { x, y, length, size }
}

function getAlign() {
    switch (gMeme.lines[gMeme.selectedLineIdx].align) {
        case 'left':
            return { dir: 'start', posX: 10, posY: gMeme.lines[gMeme.selectedLineIdx].posY };
        case 'right':
            return { dir: 'end', posX: gSize.x, posY: gMeme.lines[gMeme.selectedLineIdx].posY };
        case 'center':
            return { dir: 'center', posX: (gSize.x / 2), posY: gMeme.lines[gMeme.selectedLineIdx].posY };
    }
}

function getCurrMeme(id) {
    if (id) gMeme.selectedImgId = id;
    return gMeme.selectedImgId;
}

function getLinesAmount() {
    return gMeme.lines.length;
}

function editText(val) {
    if (gMeme.lines.length === 0) return;
    gMeme.lines[gMeme.selectedLineIdx].txt = val;
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function changePosY(diff) {
    if (gMeme.lines.length === 0) return;
    gMeme.lines[gMeme.selectedLineIdx].posY += diff;
}

function changeLines(diff) {
    if (gMeme.lines.length === 0) return;
    if (gMeme.selectedLineIdx + diff >= gMeme.lines.length) {
        gMeme.selectedLineIdx = -1;
    }
    gMeme.selectedLineIdx += diff;
}

function addLine() {
    var sample = (gMeme.lines.length === 0) ? _createNewMemeLine() : JSON.parse(JSON.stringify(gMeme.lines[gMeme.selectedLineIdx]));
    sample.txt = 'New Line!';
    gMeme.lines.unshift(sample);
}

function deleteLine() {
    if (gMeme.lines.length === 0) return;
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    if (gMeme.selectedLineIdx > 0) gMeme.selectedLineIdx -= 1;
}

function changeAlign(dir) {
    if (gMeme.lines.length === 0) return;
    gMeme.lines[gMeme.selectedLineIdx].align = dir;
}

function changeSColor(value) {
    gMeme.lines[gMeme.selectedLineIdx].color = value;
}

function changeFColor(value) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = value;
}

function changeFontFam(value) {
    gMeme.lines[gMeme.selectedLineIdx].font = value;
}

function getCurrMemeIdx() {
    return gMeme.selectedLineIdx;
}

function checkDragPos(ev) {
    var [x, y] = [ev.offsetX, ev.offsetY];
    console.log(x, y)
}

function startDragging(ev) {

}

function getCurrMemeStarterPos() {
    var imgId = getCurrMeme();
    var elImg = document.querySelector(`.item-${imgId}`);
    [gSize.x, gSize.y] = [elImg.naturalWidth, elImg.naturalHeight];
    gMeme.lines[1].posY = elImg.naturalHeight - 15;
    // gSize.x = 

}

function getMemeText() {
    return gMeme.lines[gMeme.selectedLineIdx].txt;
}

function getMemeColor() {
    return gMeme.lines[gMeme.selectedLineIdx].color;
}

function getMemeFillColor() {
    return gMeme.lines[gMeme.selectedLineIdx].fillColor;
}

function getMemeLineWidth() {
    return gMeme.lines[gMeme.selectedLineIdx].lineWidth;
}

function getMemeFontFam() {
    return gMeme.lines[gMeme.selectedLineIdx].font;
}

function getMemeFontSize() {
    return gMeme.lines[gMeme.selectedLineIdx].size;
}



// Private functions. please do not touch
function _createNewMemeLine() {
    return {
        txt: 'I never eat falafel',
        lineWidth: 1,
        size: 48,
        font: 'Impact',
        align: 'center',
        color: 'red',
        fillColor: 'white',
        posY: 50,
        isDragable: false
    }
}