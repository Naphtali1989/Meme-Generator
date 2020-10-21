'use strict';

function onInitPage() {

    renderGallery();
}

function renderGallery() {
    const imgs = getImgsToShow();
    var strHTMLs = imgs.map(img => {
        return `
        <img src="${img.url}"
        class="btn gallery-item item-${img.id}" 
        onclick="onOpenEditor('${img.id}')">
        `
    });
    var elGallery = document.querySelector('.main-gallery');
    elGallery.innerHTML = strHTMLs.join('');
}

function onOpenEditor(imgId) {
    openEditor();
    onInitEditor(imgId);
}

function onOpenGallery() {
    closeEditor();
    renderGallery()
}

function closeEditor() {
    var elContainer = document.querySelector('.main-content');
    elContainer.classList.remove('edit-mode')
}