'use strict';

const MEMES_STORAGE_KEY = 'memesDB'
const PAGE_SIZE = 5;

var gTouchPos = { x: 0, y: 0 };
var gSize = { x: 0, y: 0 };
var gCurrCurserPos = {};
var gPrevCurserPos = {};
var gStickers;
var gPageIdx = 1;

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
        isSticker: false,
        dimensionMap: {},
    }, {
        txt: 'i eat schwarma!',
        lineWidth: 1,
        size: 48,
        font: 'Impact',
        align: 'center',
        color: 'black',
        fillColor: 'white',
        posY: null,
        posX: null,
        isDragable: false,
        isSticker: false,
        dimensionMap: {},
    }],
};


function getCurrSelectedLine() {
    return gMeme.selectedLineIdx;
}

function getPos() {
    if (gMeme.lines.length === 0) return;
    var x = gMeme.lines[gMeme.selectedLineIdx].posX;
    if (!x) x = getAlign().posX
    var y = gMeme.lines[gMeme.selectedLineIdx].posY;
    var length = gMeme.lines[gMeme.selectedLineIdx].txt.length;
    var size = gMeme.lines[gMeme.selectedLineIdx].size;
    return { x, y, length, size };
}

function setTxtDimensions() {
    if (gMeme.lines.length === 0 || gMeme.lines[gMeme.selectedLineIdx].isSticker) return;
    var pos = getPos();
    var yUp = pos.y - pos.size + 2;
    var xLeft = (!pos.x || pos.x === undefined) ? 300 - pos.length * (pos.size / 3.5) - 10 : pos.x - pos.length * (pos.size / 3.5) - 10;
    var xRight = ((pos.length / 2) * (pos.size * 1.165)) + 10 + xLeft;
    gMeme.lines[gMeme.selectedLineIdx].dimensionMap = { yUp, yDown: pos.y - 2, xLeft, xRight };
}

function setStickerDimensions() {
    if (gMeme.lines.length === 0 || !gMeme.lines[gMeme.selectedLineIdx].isSticker) return;
    var pos = getPos();
    var yUp = pos.y + 2;
    var xLeft = pos.x - 2;
    var xRight = pos.x + pos.size + 2;
    var yDown = pos.y + pos.size - 2;
    gMeme.lines[gMeme.selectedLineIdx].dimensionMap = { yUp, yDown, xLeft, xRight };
}

function getAlign() {
    var posX = gMeme.lines[gMeme.selectedLineIdx].posX;
    switch (gMeme.lines[gMeme.selectedLineIdx].align) {
        case 'left':
            if (!gMeme.lines[gMeme.selectedLineIdx].posX) posX = 10;
            return { dir: 'start', posX, posY: gMeme.lines[gMeme.selectedLineIdx].posY };
        case 'right':
            if (!gMeme.lines[gMeme.selectedLineIdx].posX) posX = gSize.x - 10;
            return { dir: 'end', posX, posY: gMeme.lines[gMeme.selectedLineIdx].posY };
        case 'center':
            if (!gMeme.lines[gMeme.selectedLineIdx].posX) posX = gSize.x / 2;
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
            gMeme.lines[gMeme.selectedLineIdx].posX = gSize.x - 10;
            break;
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].posX = gSize.x / 2;
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
    var sample = createNewMemeLine();
    sample.txt = 'Enter New Text!';
    gMeme.lines.unshift(sample);
}
function createNewMemeLine() {
    return {
        txt: 'Cant touch this',
        lineWidth: 1,
        size: 48,
        font: 'Impact',
        align: 'center',
        color: 'black',
        fillColor: 'white',
        posY: 50,
        posX: null,
        isDragable: false,
        isSticker: false,
        dimensionMap: {},
    }
}

function getCurrMemeIdx() {
    return gMeme.selectedLineIdx;

}

function getTouchPos(ev) {
    return { x: ev.touches[0].clientX - gTouchPos.x, y: ev.touches[0].clientY - gTouchPos.y };
}

function getMousePos(ev) {
    return { x: ev['offsetX'], y: ev['offsetY'] };
}

function checkDragPos(pos) {
    const [offsetX, offsetY] = [pos.x, pos.y];
    const clickedLine = gMeme.lines.find(line => {
        return (offsetX > line.dimensionMap.xLeft &&
            offsetX < line.dimensionMap.xRight) &&
            (offsetY < line.dimensionMap.yDown &&
                offsetY > line.dimensionMap.yUp);
    });
    if (!clickedLine) return false;
    if (clickedLine) {
        gMeme.selectedLineIdx = gMeme.lines.findIndex(line => line === clickedLine);
        clickedLine.isDragable = true;
        gPrevCurserPos.x = offsetX;
        gPrevCurserPos.y = offsetY;
        return clickedLine.isDragable;
    }
}

function dragLine(pos) {
    if (gMeme.lines.length === 0 || !gMeme.lines[gMeme.selectedLineIdx].isDragable) return false;
    const [offsetX, offsetY] = [pos.x, pos.y];
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

function getCurrMemeStarterPos(dimentions, height, lineWidth) {
    [gTouchPos.x, gTouchPos.y] = dimentions;
    [gSize.x, gSize.y] = [lineWidth, height];
    gMeme.lines[1].posY = height - 25;
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

function getCurrSticker() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function initStickers() {
    gStickers = _createStickers();
}

function getStickersToShow() {
    var [fromIdx, toIdx] = [(gPageIdx - 1) * PAGE_SIZE, ((gPageIdx - 1) * PAGE_SIZE) + PAGE_SIZE];
    return gStickers.slice(fromIdx, toIdx);

}

function getStickerById(id) {
    return gStickers.find(sticker => sticker.id === id);
}

function getStickerId() {
    return gMeme.lines[gMeme.selectedLineIdx].id;
}

function checkIfSticker() {
    return gMeme.lines[gMeme.selectedLineIdx].isSticker;
}

function addStickerToMeme(id, x, y, url) {
    var sticker = createNewStickerLine(id, x, y, url);
    gMeme.lines.unshift(sticker);
}


function createNewStickerLine(id, posX, posY, url) {
    return {
        txt: 'ST',
        lineWidth: 1,
        size: 60,
        font: 'Impact',
        align: 'center',
        color: '#ffffff00',
        fillColor: '#ffffff00',
        posY,
        posX,
        isDragable: false,
        isSticker: true,
        dimensionMap: {},
        id,
        url,
    }
}

function changeStickerPage(diff) {
    if (((gPageIdx * PAGE_SIZE >= gStickers.length && diff === 1) ||
        (gPageIdx <= 1 && diff === -1))) return gPageIdx;
    gPageIdx += diff;
}

function saveCanvas() {
    var memes = loadFromStorage(MEMES_STORAGE_KEY);
    if (!memes) memes = [];
    var img = getImgById(gMeme.selectedImgId);
    var currMeme = { id: makeId(), img, lines: gMeme.lines }
    memes.unshift(currMeme);
    saveToStorage(MEMES_STORAGE_KEY, memes)
}

function getSavedMemes(){
    return loadFromStorage(MEMES_STORAGE_KEY);
}

function setSavedMeme(meme){
    gMeme.lines = meme.lines;
}

function resetMeme(){
    gMeme.lines =  [{
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
        isSticker: false,
        dimensionMap: {},
    }, {
        txt: 'i eat schwarma!',
        lineWidth: 1,
        size: 48,
        font: 'Impact',
        align: 'center',
        color: 'black',
        fillColor: 'white',
        posY: null,
        posX: null,
        isDragable: false,
        isSticker: false,
        dimensionMap: {},
    }]
}



// Private functions. please do not touch



function _createStickers() {
    var stickers = [];
    for (let i = 0; i < 20; i++) {
        stickers.push(_createSticker(`img/ICONS/canvas-stickers/${i + 1}.png`));
    }
    return stickers;
}

function _createSticker(url) {
    return {
        id: makeId(20),
        url,
        posY: getRandomInt(5, 150),
        posX: getRandomInt(5, 150),
        size: 60
    }
}