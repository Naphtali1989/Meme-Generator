'use strict';


function onInitPage() {
    renderGallery();
    renderSearchBar();
}

function renderGallery() {
    const imgs = getImgsToShow();
    var strHTMLs = imgs.map(img => {
        return `
        <img src="${img.url}"
        class="btn gallery-item item-${img.id}" 
        onclick="onOpenEditor('${img.id}')">
        `;
    });
    var elGallery = document.querySelector('.main-gallery');
    elGallery.innerHTML = strHTMLs.join('');
}

function renderFullSearchBar() {
    const searchWords = getSearchWords();
    var strHTMLs = searchWords.map(wordMap => {
        return `
        <span class="span btn search-word search-word-${wordMap[0]}"
        onclick="onSetSearch('${wordMap[0]}')" 
        style="font-size:${16 + wordMap[1]}px;">
        ${wordMap[0]}
        </span>
        `;
    });
    var elSpan = document.querySelector('.search-words-container');
    elSpan.innerHTML = strHTMLs.join('');
}

function renderSearchBar() {
    const searchWords = getSearchWords();
    var strHTMLs = '';
    for (let i = 0; i < 3; i++) {
        strHTMLs += `
                <span class="span btn search-word search-word-${searchWords[i][0]}"
                onclick="onSetSearch('${searchWords[i][0]}')" 
                style="font-size:${16 + searchWords[i][1]}px;">
                ${searchWords[i][0]}
                </span>
                `;
    }

    var elSpan = document.querySelector('.search-words-container');
    elSpan.innerHTML = strHTMLs;

}

function onOpenEditor(imgId) {
    openEditor();
    onInitEditor(imgId);
}

function onOpenGallery() {
    closeEditor();
    renderGallery();
}

function closeEditor() {
    var elContainer = document.querySelector('.main-content');
    elContainer.classList.remove('edit-mode');
}

function onImgInput(ev) {
    // openEditor();
    loadImageFromInput(ev);
    renderGallery();
}

function onSetSearch(value) {
    if (value) setSearch(value);
    else {
        var elSearchBar = document.querySelector('#search-bar');
        setSearch(elSearchBar.value);
    }
    renderGallery();
    renderSearchBar();
}