'use strict';

var gTouchPos = { x: 0, y: 0 };
var gSize = { x: 0, y: 0 };
var gTxtDimensions;
var gCurrCurserPos = {};
var gPrevCurserPos = {};
var gStickers;
var gIsMemeStickered = false;

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
    }],
    stickers: []
};
var gStickersOn = [];


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

function getTxtDimensions() {
    if (gMeme.lines.length === 0) return;
    var pos = getPos();
    var yUp = pos.y - pos.size + 2;
    var xLeft = (!pos.x || pos.x === undefined) ? 300 - pos.length * (pos.size / 3.5) - 10 : pos.x - pos.length * (pos.size / 3.5) - 10;
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
    if (clickedLine) {
        gMeme.selectedLineIdx = gMeme.lines.findIndex(line => line === clickedLine);
        clickedLine.isDragable = true;
        gPrevCurserPos.x = offsetX;
        gPrevCurserPos.y = offsetY;
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









// WIP - STICKERS


// function checkMemeDragPos(ev) {
//     if (!gIsMemeStickered) return;
//     const { offsetX, offsetY } = ev;

//     const clickedSticker = gMeme.stickers.find(sticker => {
//         return (offsetX > sticker.posX &&
//                 offsetX < sticker.posX + 60) &&
//             (offsetY > sticker.posY &&
//                 offsetY < sticker.posY + 60);
//     })
//     if (!clickedSticker) return;

//     else if (clickedSticker) {
//         console.log('should we drag?', clickedSticker)
//         var idx = gMeme.stickers.findIndex(sticker => sticker === clickedSticker)
//         gMeme.selectedStickerIdx = idx
//         gPrevStickerPos.x = offsetX;
//         gPrevStickerPos.y = offsetY;
//         clickedSticker.isDragable = true;
//         gIsStickerDragging = true;
//     }
// }


// function dragSticker(ev) {
//     console.log(gMeme.stickers.length)

//     if (gMeme.stickers.length === 0 || !gMeme.stickers[gMeme.selectedStickerIdx].isDragable) return false;

//     const { offsetX, offsetY } = ev;
//     gPrevStickerPos.x = offsetX;
//     gPrevStickerPos.y = offsetY;
//     var [x, y] = getDistance();
//     changePosX(x);
//     changePosY(y);
//     gPrevStickerPos.x = offsetX;
//     gPrevStickerPos.y = offsetY;
// }


function getCurrStickerLocation(id) {
    var currSticker = getStickerById(id);
    // console.log(currSticker)
    return
}

function getStickersToShow() {
    var stickers = _createStickers();
    gStickers = stickers;
    return stickers;
}

function getStickerById(id) {
    return gStickers.find(sticker => sticker.id === id);
}

function addStickerToMeme(sticker) {
    gMeme.stickers.push(sticker);
    gIsMemeStickered = true;
}







// Private functions. please do not touch
function _createNewMemeLine() {
    return {
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
    }
}

function _createStickers() {
    var stickers = [];
    for (let i = 0; i < 4; i++) {
        stickers.push(_createSticker(`img/ICONS/canvas-stickers/${i+1}.png`));
    }
    return stickers;
}

function _createSticker(url) {
    return {
        id: makeId(20),
        url,
        posX: 220,
        posY: 220,
        isDragable: false
    }
}