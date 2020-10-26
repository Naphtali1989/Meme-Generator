'use strict';

var gCanvas;
var gCtx;
var gCurrIdx = 0;
var gCurrPos;
var gIsDragging = false;


function openEditor() {
    var elContainer = document.querySelector('.main-content');
    elContainer.classList.add('edit-mode');
}

function onInitEditor(id) {
    getCurrMeme(id);
    onInitCanvas();
    resizeCanvas(id);
    initStickers();
    renderStickers();
}

function onInitCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');

}

function resizeCanvas(id, size = 600) {
    if (!gCanvas) return
    var elImg = document.querySelector(`.item-${id}`);
    gCanvas.width = size;
    if (!elImg) gCanvas.height = 600;
    else gCanvas.height = (gCanvas.width * elImg.naturalHeight) / elImg.naturalWidth;
    var dimentions = [gCanvas.getBoundingClientRect().left, gCanvas.getBoundingClientRect().top];
    var height = gCanvas.getBoundingClientRect().height;
    var width = gCanvas.getBoundingClientRect().width;
    getCurrMemeStarterPos(dimentions, height, width);
    onDrawMeme();
}

function onResizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    resizeCanvas(getCurrMeme(), elContainer.offsetWidth)
}

function onDrawMeme() {
    var currImg = getImgById(getCurrMeme());
    var img = new Image();
    img.src = `./${currImg.url}`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        gCurrPos = getPos();
        var linesNum = getLinesAmount();
        for (let i = 0; i < linesNum; i++) {
            var align = getAlign();
            var selectedLine = getCurrSelectedLine();
            var isSticker = checkIfSticker(gCurrIdx);
            if (!isSticker) {
                setTxtDimensions();
                if (selectedLine === gCurrIdx) drawTextOutline();
                onDrawText(align.dir, align.posX, align.posY);
            } else {
                setStickerDimensions();
                if (selectedLine === gCurrIdx) drawStickerOutline();
                var currSticker = getCurrSticker();
                drawSticker(currSticker)
            }
            changeLines(1);
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

    if (!gCurrPos.x || gCurrPos.x === undefined) {
        var posX = 300 - gCurrPos.length * (gCurrPos.size / 3.5) - 10;
    } else {
        var posX = gCurrPos.x - gCurrPos.length * (gCurrPos.size / 3.5) - 10;
    }

    gCtx.beginPath();
    gCtx.rect(posX, gCurrPos.y - yLength + 5, xLength, yLength + 2);
    gCtx.strokeStyle = '#424874';
    gCtx.stroke();
    gCtx.fillStyle = '#42487460';
    gCtx.fillRect(posX, gCurrPos.y - yLength + 5, xLength, yLength + 2);
}

function drawStickerOutline() {
    gCtx.beginPath();
    gCtx.rect(gCurrPos.x - 5, gCurrPos.y - 5, gCurrPos.size + 10, gCurrPos.size + 5);
    gCtx.strokeStyle = '#424874';
    gCtx.stroke();
    gCtx.fillStyle = '#42487460';
    gCtx.fillRect(gCurrPos.x - 5, gCurrPos.y - 5, gCurrPos.size + 10, gCurrPos.size + 5);
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
            var isSticker = checkIfSticker(gCurrIdx);
            if (!isSticker) {
                setTxtDimensions();
                onDrawText(align.dir, align.posX, align.posY);
            } else {
                setStickerDimensions();
                var currSticker = getCurrSticker();
                drawSticker(currSticker)
            }
            changeLines(1);
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
    getCurrLine();
    onDrawMeme();
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
    gCurrIdx = getCurrSelectedLine();
}

function onStartDragging(ev) {
    var pos = getMousePos(ev);
    gIsDragging = checkDragPos(pos);
    getMemeIdx();
    getCurrLine();
    onDrawMeme();
}

function onDragLine(ev) {
    if (!gIsDragging) return;
    var pos = getMousePos(ev);
    dragLine(pos);
    onDrawMeme();
}

function onStopDragging(ev) {
    gIsDragging = false;
    stopDragging(ev);
}

function onHandleTouch(ev) {
    ev.preventDefault();
    var pos = getTouchPos(ev);
    checkDragPos(pos);
    gIsDragging = checkDragPos(pos);
    getMemeIdx();
    getCurrLine();
    onDrawMeme();
}

function onTouchDragLine(ev) {
    if (!gIsDragging) return;
    var pos = getTouchPos(ev);
    dragLine(pos);
    onDrawMeme();
}

function onDownloadCanvas(elLink) {
    clearOutline();
    setTimeout(() => {
        downloadCanvas(elLink);
    }, 1000)
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'meme.jpg';
}

function onSaveCanvas() {
    saveCanvas();
}

function onUploadImg(elForm, ev) {
    clearOutline();
    uploadImg(elForm, ev);
}

function renderStickers() {
    var stickers = getStickersToShow();
    var strHTMLs = stickers.map(sticker => {
        return `
        <img src="${sticker.url}"
        class="btn edit-sticker sticker-${sticker.id}" 
        onclick="onAddSticker('${sticker.id}')"></div>
        `;
    });
    var elStickers = document.querySelector('.sticker-picker');
    elStickers.innerHTML = strHTMLs.join('');
}


function onAddSticker(id) {
    var currSticker = getStickerById(id);
    addStickerToMeme(currSticker.id, currSticker.posX, currSticker.posY, currSticker.url);
    onDrawMeme();
}

function drawSticker({ url, posX, posY, size }) {
    var img = new Image()
    img.src = `./${url}`;
    img.onload = () => {
        gCtx.drawImage(img, posX, posY, size, size);
    }
}

function onChangeStickerPage(diff) {
    changeStickerPage(diff);
    renderStickers();
}

function getCurrLine() {
    const txt = getCurrMemeLine();
    renderCurrLine(txt);
    setTimeout(focusLine, 1)
}

function renderCurrLine(txt) {
    const elInput = document.querySelector('.txt-edit');
    elInput.value = txt;
}

function focusLine() {
    document.querySelector('.txt-edit').focus();
}