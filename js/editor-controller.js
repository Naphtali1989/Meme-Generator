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

function drawCurrMeme() {
    var align = getAlign();
    onDrawMeme();
    onDrawText(align.dir, align.posX, align.posY);
}

function onEditText(val) {
    editText(val);
    drawCurrMeme();
}

function onChangeFontSize(diff) {
    changeFontSize(diff);
    drawCurrMeme();
}

function onChangePosY(diff) {
    changePosY(diff);
    drawCurrMeme();
}

function onChangeLines(diff) {
    changeLines(diff);
    var align = getAlign();
    onDrawText(align.dir, align.posX, align.posY);
}