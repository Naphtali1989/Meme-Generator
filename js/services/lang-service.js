'use strict';

var gTrans = {
    title: {
        he: 'המימר של נפתלי',
        en: 'Naphtali\'s Memer',
    },
    'gallery-btn': {
        he: 'גלריה',
        en: 'Gallery'
    },
    'saved-memes-btn': {
        he: 'ממים שמורים',
        en: 'Saved Memes'
    },
    'about-btn': {
        he: 'אודות',
        en: 'About'
    },
    search: {
        he: 'חיפוש',
        en: 'Search'
    },
    'show-more-btn': {
        he: 'עוד...',
        en: 'More...'
    },
    'lang-select-header': {
        he: 'שפה',
        en: 'Language:'
    },
    'meme-editor-txt': {
        he: 'כתוב את מימך כאן!',
        en: 'Write your meme here!'
    },
    'share-btn': {
        he: 'שיתוף',
        en: 'Share'
    },
    'save-btn': {
        he: 'שמירה',
        en: 'Save'
    },
    'download-btn': {
        he: 'הורדה',
        en: 'Download'
    },
    footer: {
        he: '© נכתב ע"י נפתלי רובין, מתכנת בהתהוות - לומד בקודינג אקדמי',
        en: 'Made by Naphtali Rubin - Ninja programming cadet at the Coding Academy ©'
    }
}
var gCurrLang = 'en';


function getTrans(translateKey) {
    const translateMap = gTrans[translateKey];
    if (!translateMap) return 'UNKNOWN';
    var currTrans = translateMap[gCurrLang];
    if (!currTrans) currTrans = translateMap['en'];
    return currTrans;
}

function makeTrans() {
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(el => {
        const translateKey = el.dataset.trans;
        if (el.placeholder) el.placeholder = getTrans(translateKey);
        else el.innerHTML = getTrans(translateKey);
    });
}

function setLang(lang) {
    gCurrLang = lang;
}
