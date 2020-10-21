'use strict';

function onInitPage() {
    console.log('Hi Gallery!')
    renderGallery();
}

function renderGallery() {
    const imgs = getImgsToShow();
    var strHTMLs = imgs.map(img => {
        return `
        <img src="${img.url}"
        class="gallery-item item-${img.id}" 
        onclick="onOpenEditor('${img.id}')">
        
        `
    });
    var elGallery = document.querySelector('.main-gallery');
    console.log(imgs, strHTMLs)
    elGallery.innerHTML = strHTMLs.join('');

}