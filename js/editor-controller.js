'use strict';

var gCanvas;
var gCtx;
var gCurrIdx = 0;
var gCurrPos;


function openEditor() {
    var elContainer = document.querySelector('.main-content');
    elContainer.classList.add('edit-mode');
}

function onInitEditor(id) {
    getCurrMeme(id);
    onInitCanvas();
    resizeCanvas(id);
    renderStickers();
}

function onInitCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');

}

function resizeCanvas(id, size = 600) {
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
            getTxtDimensions();
            var selectedLine = getCurrSelectedLine();
            if (selectedLine === gCurrIdx) drawTextOutline();
            onDrawText(align.dir, align.posX, align.posY);
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
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
    gCtx.fillStyle = '#ffffff60';
    gCtx.fillRect(posX, gCurrPos.y - yLength + 5, xLength, yLength + 2);
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
    gCurrIdx = getCurrMemeIdx();
}

function onStartDragging(ev) {
    var pos = getMousePos(ev);
    checkDragPos(pos);
}

function onDragLine(ev) {
    var pos = getMousePos(ev);
    dragLine(pos);
    onDrawMeme();
}

function onStopDragging(ev) {
    stopDragging(ev);
}

function onHandleTouch(ev) {
    ev.preventDefault();
    var pos = getTouchPos(ev);
    checkDragPos(pos);
}

function onTouchDragLine(ev) {
    var pos = getTouchPos(ev);
    dragLine(pos);
    onDrawMeme();
}

function onDownloadCanvas(elLink) {
    clearOutline();
    setTimeout(() => {
        const data = gCanvas.toDataURL();
        elLink.href = data;
        elLink.download = 'meme.jpg';
    }, 200)

}

function onUploadImg(elForm, ev) {
    clearOutline();
    uploadImg(elForm, ev);
}







// Stickers - WIP

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
    drawSticker(currSticker.url, currSticker.posX, currSticker.posY);
    gStickersOn.push(currSticker);
    addStickerToMeme(currSticker);
}

function drawSticker(url, x, y) {
    var img = new Image()
    img.src = `./${url}`;
    img.onload = () => {
        gCtx.drawImage(img, x, y, 60, 60);
    }
}

function onChangeStickerPage() {

}