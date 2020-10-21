'use strict';

var gCanvas;
var gCtx;


function onInitCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
}

function onInitEditor(id) {
    getCurrMeme(id);
    onInitCanvas();
    onDrawMeme();
}

function onDrawMeme() {
    var elImg = document.querySelector(`.item-${getCurrMeme()}`);
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);

    var linesNum = getLinesAmount();
    for (let i = 0; i < linesNum; i++) {
        var align = getAlign();
        onDrawText(align.dir, align.posX, align.posY);
        onChangeLines(1);
    }
}

function onDrawText(align, x, y) {
    gCtx.strokeStyle = getMemeColor();
    gCtx.fillStyle = getMemeFillColor();
    gCtx.lineWidth = getMemeLineWidth();
    gCtx.font = `${getMemeFontSize()}px ${getMemeFontFam()}`;
    gCtx.textAlign = align;
    gCtx.fillText(getMemeText(), x, y)
    gCtx.strokeText(getMemeText(), x, y)
}

function drawTextOutline(x, y, fontSize) {
    gCtx.beginPath()
    gCtx.rect(x + 5, y + 5, 450, fontSize + 5)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function onEditText(val) {
    editText(val);
    onDrawMeme();
}

function onChangeFontSize(diff) {
    changeFontSize(diff);
    onDrawMeme();
}

function onChangePosY(diff) {
    changePosY(diff);
    onDrawMeme();
}

function onChangeLines(diff) {
    changeLines(diff);
    // drawTextOutline(x, y, getMemeFontSize());
}

function onAddLine() {
    addLine();
    onDrawMeme();
}

function onDeleteLine() {
    deleteLine();
    onDrawMeme();
}

function onChangeAlign(dir) {
    changeAlign(dir);
    onDrawMeme();
}