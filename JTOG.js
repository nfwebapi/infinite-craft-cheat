// ==UserScript==
// @name         JTOG V4 Inv Editor
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Create custom items with JTOG V4
// @author       noface
// @match        https://neal.fun/infinite-craft/*
// @grant        none
// @updateURL    https://github.com/nfwebapi/infinite-craft-cheat/JTOG.js
// @downloadURL  https://github.com/nfwebapi/infinite-craft-cheat/JTOG.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to open a popup window
    function openPopup() {
        const popup = window.open("", "popupWindow", "width=400,height=300");
        popup.document.write(`<html><head><title>Create New Item</title></head><body></body></html>`);

        // Load HTML content into the popup
        const script = popup.document.createElement('script');
        script.src = 'https://raw.githubusercontent.com/nfwebapi/infinite-craft-cheat/main/assets/popup.html'; 
        popup.document.head.appendChild(script);
    }

    // Call the openPopup function when the script runs
    openPopup();

})();
