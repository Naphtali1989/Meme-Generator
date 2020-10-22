'use strict';

var gSize = { x: 0, y: 0 }
var gTxtDimensions;
var gCurrCurserPos = {};
var gPrevCurserPos = {};

var gMeme = {
    selectedImgId: '',
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat falafel',
        lineWidth: 1,
        size: 48,
        font: 'Impact',
        align: 'center',
        color: 'black',
        fillColor: 'white',
        posY: 50,
        posX: null,
        isDragable: false,
        dimensionMap: {},
    }, {
        txt: 'i eat schwarma!',
        lineWidth: 1,
        size: 48,
        font: 'Impact',
        align: 'center',
        color: 'black',
        fillColor: 'white',
        posY: 0,
        posX: null,
        isDragable: false,
        dimensionMap: {},
    }]
};


function getCurrSelectedLine() {
    return gMeme.selectedLineIdx;
}

function getPos() {
    if (gMeme.lines.length === 0) return;
    var x = gMeme.lines[gMeme.selectedLineIdx].posX;
    var y = gMeme.lines[gMeme.selectedLineIdx].posY;
    var length = gMeme.lines[gMeme.selectedLineIdx].txt.length;
    var size = gMeme.lines[gMeme.selectedLineIdx].size;
    return { x, y, length, size }
}

function getTxtDimensions() {
    if (gMeme.lines.length === 0) return;
    var pos = getPos();
    var yUp = pos.y - pos.size + 2;
    var xLeft = 300 - pos.length * (pos.size / 3.5) - 10;
    var xRight = ((pos.length / 2) * (pos.size * 1.165)) + 10 + xLeft;
    gMeme.lines[gMeme.selectedLineIdx].dimensionMap = { yUp, yDown: pos.y - 2, xLeft, xRight };
}

function getAlign() {
    var posX = gMeme.lines[gMeme.selectedLineIdx].posX;
    switch (gMeme.lines[gMeme.selectedLineIdx].align) {
        case 'left':
            if (!gMeme.lines[gMeme.selectedLineIdx].posX) posX = 10;
            return { dir: 'start', posX, posY: gMeme.lines[gMeme.selectedLineIdx].posY };
        case 'right':
            if (!gMeme.lines[gMeme.selectedLineIdx].posX) posX = 590;
            return { dir: 'end', posX, posY: gMeme.lines[gMeme.selectedLineIdx].posY };
        case 'center':
            if (!gMeme.lines[gMeme.selectedLineIdx].posX) posX = 590 / 2;
            return { dir: 'center', posX, posY: gMeme.lines[gMeme.selectedLineIdx].posY };
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

function changePosX(diff) {
    if (gMeme.lines.length === 0) return;
    gMeme.lines[gMeme.selectedLineIdx].posX += diff;
}

function changeLines(diff) {
    if (gMeme.lines.length === 0) return;
    if (gMeme.selectedLineIdx + diff >= gMeme.lines.length) {
        gMeme.selectedLineIdx = -1;
    }
    gMeme.selectedLineIdx += diff;
}

function deleteLine() {
    if (gMeme.lines.length === 0) return;
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    if (gMeme.selectedLineIdx > 0) gMeme.selectedLineIdx -= 1;
}

function changeAlign(dir) {
    if (gMeme.lines.length === 0) return;
    gMeme.lines[gMeme.selectedLineIdx].align = dir;
    switch (gMeme.lines[gMeme.selectedLineIdx].align) {
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].posX = 10;
            break;
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].posX = 590;
            break;

        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].posX = 590 / 2;
            break;
    }
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

function addLine() {
    var sample = (gMeme.lines.length === 0) ? _createNewMemeLine() : JSON.parse(JSON.stringify(gMeme.lines[gMeme.selectedLineIdx]));
    sample.txt = 'New Line!';
    gMeme.lines.unshift(sample);
}

function getCurrMemeIdx() {
    return gMeme.selectedLineIdx;

}

function checkDragPos(ev) {
    const { offsetX, offsetY } = ev;

    // const { clientX, clientY } = ev;
    const clickedLine = gMeme.lines.find(line => {
        return (offsetX > line.dimensionMap.xLeft &&
                offsetX < line.dimensionMap.xRight) &&
            (offsetY < line.dimensionMap.yDown &&
                offsetY > line.dimensionMap.yUp);
    })
    var idx = gMeme.lines.findIndex(line => line === clickedLine)
    if (clickedLine) {
        gMeme.selectedLineIdx = idx
        gPrevCurserPos.x = offsetX;
        gPrevCurserPos.y = offsetY;
        clickedLine.isDragable = true;
    }
}

function checkIfDraging() {
    if (gMeme.lines.length === 0 ||
        !gMeme.lines[gMeme.selectedLineIdx].isDragable) return false;
    return true;
}

function dragLine(ev) {
    if (gMeme.lines.length === 0 || !gMeme.lines[gMeme.selectedLineIdx].isDragable) return false;

    const { offsetX, offsetY } = ev;
    gCurrCurserPos.x = offsetX;
    gCurrCurserPos.y = offsetY;
    var [x, y] = getDistance()
    if (!gMeme.lines[gMeme.selectedLineIdx].posX) x = gCurrCurserPos.x;
    changePosX(x);
    changePosY(y);
    gPrevCurserPos.x = offsetX;
    gPrevCurserPos.y = offsetY;
}

function getDistance() {
    var x = gCurrCurserPos.x - gPrevCurserPos.x;
    var y = gCurrCurserPos.y - gPrevCurserPos.y;
    return [x, y];
}

function stopDragging() {
    if (gMeme.lines.length === 0) return;
    gMeme.lines[gMeme.selectedLineIdx].isDragable = false;
}

function getCurrMemeStarterPos(width, height) {
    [gSize.x, gSize.y] = [width, height];
    gMeme.lines[1].posY = height - 15;
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
        posX: null,
        isDragable: false,
        dimensionMap: {},
    }
}