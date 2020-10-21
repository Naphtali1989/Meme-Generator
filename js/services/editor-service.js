'use strict';

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
        isDragable: false
    }, {
        txt: 'but when i do',
        lineWidth: 1,
        size: 48,
        font: 'Impact',
        align: 'center',
        color: 'red',
        fillColor: 'white',
        posY: 250,
        isDragable: false
    }, {
        txt: 'i eat schwarma!',
        lineWidth: 1,
        size: 48,
        font: 'Impact',
        align: 'center',
        color: 'red',
        fillColor: 'white',
        posY: 490,
        isDragable: false
    }]
};

function getAlign() {
    switch (gMeme.lines[gMeme.selectedLineIdx].align) {
        case 'left':
            return { dir: 'start', posX: 10, posY: gMeme.lines[gMeme.selectedLineIdx].posY };
        case 'right':
            return { dir: 'end', posX: 490, posY: gMeme.lines[gMeme.selectedLineIdx].posY };
        case 'center':
            return { dir: 'center', posX: 250, posY: gMeme.lines[gMeme.selectedLineIdx].posY };
    }
}

function getCurrMeme(id) {
    if (id) gMeme.selectedImgId = id;
    return gMeme.selectedImgId;
}

function getLinesAmount() {
    return gMeme.lines.length
}

function editText(val) {
    gMeme.lines[gMeme.selectedLineIdx].txt = val;
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function changePosY(diff) {
    gMeme.lines[gMeme.selectedLineIdx].posY += diff;
}

function changeLines(diff) {
    if (gMeme.selectedLineIdx + diff >= gMeme.lines.length) {
        gMeme.selectedLineIdx = -1;
    }
    gMeme.selectedLineIdx += diff;
}

function addLine() {
    var sample = (gMeme.lines.length === 0) ? _createNewMemeLine() : JSON.parse(JSON.stringify(gMeme.lines[gMeme.selectedLineIdx]));
    sample.txt = 'New Line!'
    gMeme.lines.push(sample);
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}

function changeAlign(dir) {
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