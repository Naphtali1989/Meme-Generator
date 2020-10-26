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
        he: 'ממים',
        en: 'Memes'
    },
    'about-btn': {
        he: 'אודות',
        en: 'About'
    },
    search: {
        he: 'חיפוש',
        en: 'Search'
    },
    'file-input-btn': {
        he: 'לחץ כאן כדי להעלות תמונה',
        en: 'Click here to upload an image'
    },
    'show-more-btn': {
        he: 'עוד...',
        en: 'More...'
    },
    'lang-select-header': {
        he: 'שפה',
        en: 'Language'
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
    'my-name': {
        he: 'נפתלי רובין',
        en: 'Naphtali Rubin'
    },
    'my-occupation': {
        he: `מפתח פולסטאק גו'ניור`,
        en: `Junior Full-Stack Programmer`
    },
    'about-info-header': {
        he: `הי! אני נפתלי`,
        en: `Hi! I am Naphtali`
    },
    'about-paragraph-one': {
        he: `אני כרגע לומד בקורס התכנות של קודינג אקדמי, ואני מעוניין להיות המתכנת הכי טוב שיש! בעברי התנסיתי בקורס בדיקות תוכנה של של ג'ון ברייס וגם התנסיתי מעט במקצוע לפני מס' שנים. אני נהנה לחקור ולבנות, ומצאתי את אהבתי בפיתוח תוכנה.`,
        en: `I'm a programmer in training who wishes to be the very best! Currently working on my studies with the Coding Academy course, but i have dabbled in various courses in the past. In the past, i went through a QA course with John Bryce, and started my journey
        into the depths of high-tech.`
    },
    'about-paragraph-two': {
        he: `אני ממש אוהב משחקי מחשב ולהיות גיק במלוא מובן המילה. הכי מתחבר למדע בדיוני ופנטזיה - אך לפעמים נהנה גם ממיינסטרים. אני נהנה לקרוא ספרים (כרגע בעיצומה של הסאגה "המשחק של אנדר"), לראות סרטים וסדרות (האהובים עליי הם היקומים של מארוול ומלחמת הכוכבים, וכרגע בעיצומו של בינג' מסע בין כוכבים).`,
        en: `I really love gaming and delving into geeky stuff, especially fantasy and science fiction. I love reading books (Currently reading the "Ender's game" books), watching movies, binging TV shows and more! My favorites are the Warcraft universe, The Marvel universe and the Star Wars universe.`
    },
    footer: {
        he: `© נכתב ע"י נפתלי רובין, מתכנת בהתהוות - לומד בקודינג אקדמי`,
        en: `Made by Naphtali Rubin - Ninja programming cadet at the Coding Academy ©`
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