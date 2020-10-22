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
    resizeCanvas(id);
    onDrawMeme();
}

function resizeCanvas(id) {
    var elImg = document.querySelector(`.item-${id}`)
    gCanvas.width = 600
    if (!elImg) gCanvas.height = 600;
    else gCanvas.height = (gCanvas.width * elImg.naturalHeight) / elImg.naturalWidth
    getCurrMemeStarterPos(gCanvas.width, gCanvas.height);
}

function onDrawMeme() {
    var currImg = getImgById(getCurrMeme());
    var img = new Image()
    img.src = `./${currImg.url}`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        gCurrPos = getPos();

        var linesNum = getLinesAmount();
        for (let i = 0; i < linesNum; i++) {
            var align = getAlign();
            getTxtDimensions();
            var selectedLine = getCurrSelectedLine();
            if (selectedLine === gCurrIdx) drawTextOutline();
            onDrawText(align.dir, align.posX, align.posY);
            onChangeLines(1);
        }
    }
}

function onDrawText(align, x, y) {
    gCtx.strokeStyle = getMemeColor();
    gCtx.fillStyle = getMemeFillColor();
    gCtx.lineWidth = getMemeLineWidth();
    gCtx.font = `${getMemeFontSize()}px ${getMemeFontFam()}`;
    gCtx.textAlign = align;
    gCtx.fillText(getMemeText(), x, y);
    gCtx.strokeText(getMemeText(), x, y);
}

function drawTextOutline() {
    var yLength = gCurrPos.size + 2;
    var xLength = ((gCurrPos.length / 2) * (gCurrPos.size * 1.165)) + 10;
    gCurrPos.x = 300 - gCurrPos.length * (gCurrPos.size / 3.5) - 10;

    gCtx.beginPath();
    gCtx.rect(gCurrPos.x, gCurrPos.y - yLength + 5, xLength, yLength + 2);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function clearOutline() {
    var currImg = getImgById(getCurrMeme());
    var img = new Image()
    img.src = `./${currImg.url}`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        gCurrPos = getPos();
        var linesNum = getLinesAmount();
        for (let i = 0; i < linesNum; i++) {
            var align = getAlign();
            getTxtDimensions();
            onDrawText(align.dir, align.posX, align.posY);
            onChangeLines(1);
        }
    }
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
}

function onDragLine(ev) {
    dragLine(ev);
    onDrawMeme();
}

function onStopDragging(ev) {
    stopDragging(ev);
}

function onDownloadCanvas(elLink) {
    clearOutline();
    setTimeout(() => {
        const data = gCanvas.toDataURL();
        elLink.href = data;
        elLink.download = 'meme.jpg';
    }, 1000)

}

function onUploadImg(elForm, ev) {
    uploadImg(elForm, ev)
}