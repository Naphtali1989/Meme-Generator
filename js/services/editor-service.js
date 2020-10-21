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
            lineWidth: 1,
            size: 48,
            font: 'Impact',
            align: 'center',
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

function drawText(align, x, y) {
    gCtx.strokeStyle = gMeme.lines[gMeme.selectedLineIdx].color;
    gCtx.fillStyle = gMeme.lines[gMeme.selectedLineIdx].fillColor;
    gCtx.lineWidth = gMeme.lines[gMeme.selectedLineIdx].lineWidth;
    gCtx.font =
        `${gMeme.lines[gMeme.selectedLineIdx].size}px ${gMeme.lines[gMeme.selectedLineIdx].font}`;
    gCtx.textAlign = align;

    gCtx.fillText(gMeme.lines[gMeme.selectedLineIdx].txt, x, y)
    gCtx.strokeText(gMeme.lines[gMeme.selectedLineIdx].txt, x, y)
}

function getAlign() {
    switch (gMeme.lines[gMeme.selectedLineIdx].align) {
        case 'left':
            return { dir: 'start', posX: 10 };
        case 'right':
            return { dir: 'end', posX: 490 };
        case 'center':
            return { dir: 'center', posX: 250 };
    }
}

function editText(val) {
    gMeme.lines[gMeme.selectedLineIdx].txt = val;
    var align = getAlign();
    drawMeme();
    drawText(align.dir, align.posX, 50)
}