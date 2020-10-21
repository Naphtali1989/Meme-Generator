'use strict';

var gCanvas;
var gCtx;

var gMeme;

function initCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
}

function initEditor(id) {
    console.log('Hello editor!')
    gMeme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [{
            txt: 'I never eat falafel',
            size: 20,
            align: 'left',
            color: 'red',
            fillColor: 'white',
            isDragable: false
        }]
    }
    initCanvas();
    drawMeme();
}

function drawMeme() {
    var elImg = document.querySelector(`.item-${gMeme.selectedImgId}`);
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}