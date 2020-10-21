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
        txt: 'I am the mid',
        lineWidth: 1,
        size: 48,
        font: 'Impact',
        align: 'center',
        color: 'red',
        fillColor: 'white',
        posY: 250,
        isDragable: false
    }, {
        txt: 'I might be ended',
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
    console.log(gMeme.lines[gMeme.selectedLineIdx])
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

function editText(val) {
    gMeme.lines[gMeme.selectedLineIdx].txt = val;
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function changePosY(diff) {
    gMeme.lines[gMeme.selectedLineIdx].posY += diff;
    console.log(gMeme.lines[gMeme.selectedLineIdx].posY)
}

function changeLines(diff) {
    console.log('this is the line index:', gMeme.selectedLineIdx)
    if (gMeme.selectedLineIdx + diff >= gMeme.lines.length) {
        gMeme.selectedLineIdx = -1;
    }
    gMeme.selectedLineIdx += diff;
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