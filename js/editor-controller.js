'use strict';

var gCanvas;
var gCtx;
var gCurrIdx = 0;
var gCurrPos;


function openEditor() {
    var elContainer = document.querySelector('.main-content');
    elContainer.classList.add('edit-mode')
}

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
        var selectedLine = getCurrSelectedLine();
        var align = getAlign();
        if (selectedLine === gCurrIdx) drawTextOutline();
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

function drawTextOutline() {
    var gCurrPos = getPos();
    var yLength = gCurrPos.size + 2;
    var xLength = ((gCurrPos.size / 2) * gCurrPos.length);
    gCurrPos.x = ((500 - xLength) / gCurrPos.length) + gCurrPos.size;
    console.log(yLength)
    console.log(xLength)

    gCtx.beginPath();
    gCtx.rect(gCurrPos.x, gCurrPos.y - yLength + 5, xLength, yLength);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function onEditText(val) {
    getMemeIdx();
    editText(val);
    onDrawMeme();
}

function onChangeFontSize(diff) {
    getMemeIdx();
    changeFontSize(diff);
    onDrawMeme();
}

function onChangePosY(diff) {
    getMemeIdx();
    changePosY(diff);
    onDrawMeme();
}

function onChangeLines(diff) {
    changeLines(diff);
}

function onAddLine() {
    addLine();
    onDrawMeme();
}

function onDeleteLine() {
    deleteLine();
    getMemeIdx();
    onDrawMeme();
}

function onChangeAlign(dir) {
    getMemeIdx();
    changeAlign(dir);
    onDrawMeme();
}

function onChangeSColor(value) {
    getMemeIdx();
    changeSColor(value);
    onDrawMeme();
}

function onChangeFColor(value) {
    getMemeIdx();
    changeFColor(value);
    onDrawMeme();
}

function onChangeFontFam(value) {
    getMemeIdx();
    changeFontFam(value);
    onDrawMeme();
}

function getMemeIdx() {
    gCurrIdx = getCurrMemeIdx()
}

function onStartDragging(ev) {
    checkDragPos(ev);
    startDragging(ev);
}

function onDrag(ev) {}

function onStopDragging(ev) {}