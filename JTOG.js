// ==UserScript==
// @name         JTOG V1
// @namespace    http://tampermonkey.net/
// @version      3.2
// @description  New Version With Custom API implementation
// @author       noface, ppougi
// @match        https://neal.fun/infinite-craft/*
// @grant        none
// @updateURL    https://github.com/nfwebapi/infinite-craft-cheat/JTOG.js
// @downloadURL  https://github.com/nfwebapi/infinite-craft-cheat/JTOG.js
// ==/UserScript==

(function() {
    'use strict';

    let customResponseMode = false,
        customResult = "",
        customEmoji = "",
        combineResult = true,
        originalFetch = window.fetch,
        input1, input2, toggleModeButton, combineButton, discordButton;

    function toggleMode() {
        customResponseMode = !customResponseMode;
        toggleButtonColor(toggleModeButton, customResponseMode);
        console.log(`Custom Response Mode: ${customResponseMode ? 'Enabled' : 'Disabled'}`);
    }

    function toggleCombine() {
        combineResult = !combineResult;
        toggleButtonColor(combineButton, combineResult);
        console.log(`Combine Result: ${combineResult ? 'Enabled' : 'Disabled'}`);
    }

    function setCustomValues() {
        customResult = input1.value.trim();
        customEmoji = input2.value.trim();
    }

    function openDiscord() {
        window.open('https://discord.gg/XkSjusTkWA', '_blank');
    }

    function toggleButtonColor(button, toggled) {
        button.style.backgroundColor = toggled ? '#4caf50' : '#f44336';
    }

    window.fetch = function(url, options) {
        if (customResponseMode) {
            const customResponse = {"emoji": customEmoji, "isNew": "false", "result": customResult};
            return Promise.resolve(new Response(JSON.stringify(customResponse), {status: 200, headers: {'Content-Type': 'application/json'}}));
        } else {
            return originalFetch.apply(this, [url, options])
                .then(response => response.json())
                .then(data => {
                    let result = data.result;
                    if (combineResult) result += " ";
                    const combinedResponse = {"emoji": customEmoji, "isNew": false, "result": result};
                    return Promise.resolve(new Response(JSON.stringify(combinedResponse), {status: 200, headers: {'Content-Type': 'application/json'}}));
                });
        }
    };

    const popupWidth = 300, popupHeight = 400,
        left = (window.innerWidth - popupWidth) / 2,
        top = (window.innerHeight - popupHeight) / 2,
        popupFeatures = `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`,
        popupWindow = window.open('', 'popupWindow', popupFeatures);

    if (popupWindow) {
        const styles = `body {font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;} input[type="text"] {width: 100%; padding: 8px; margin-bottom: 10px; box-sizing: border-box;} button {width: 100%; padding: 10px; color: white; border: none; cursor: pointer; margin-bottom: 10px;} button:hover {background-color: #45a049;} .discord-button {width: 100%; padding: 10px; background-color: #5865F2; color: white; border: none; cursor: pointer; margin-bottom: 10px;} .discord-button:hover {background-color: #4054d4;} label {display: block; margin-bottom: 5px;}`;

        const styleElement = popupWindow.document.createElement('style');
        styleElement.textContent = styles;
        popupWindow.document.head.appendChild(styleElement);

        input1 = popupWindow.document.createElement('input');
        input1.type = 'text';
        input1.placeholder = 'Result';
        popupWindow.document.body.appendChild(input1);

        input2 = popupWindow.document.createElement('input');
        input2.type = 'text';
        input2.placeholder = 'Emoji(also changes api given icons)';
        popupWindow.document.body.appendChild(input2);

        toggleModeButton = popupWindow.document.createElement('button');
        toggleModeButton.textContent = 'Toggle Custom Response Mode';
        toggleModeButton.addEventListener('click', toggleMode);
        toggleButtonColor(toggleModeButton, customResponseMode);
        popupWindow.document.body.appendChild(toggleModeButton);

        combineButton = popupWindow.document.createElement('button');
        combineButton.textContent = 'Allow Combine Anything';
        combineButton.addEventListener('click', toggleCombine);
        toggleButtonColor(combineButton, combineResult);
        popupWindow.document.body.appendChild(combineButton);

        const customValuesButton = popupWindow.document.createElement('button');
        customValuesButton.textContent = 'Save New Element(combine to get)';
        customValuesButton.addEventListener('click', setCustomValues);
        popupWindow.document.body.appendChild(customValuesButton);

        discordButton = popupWindow.document.createElement('button');
        discordButton.textContent = 'Join our Discord Server';
        discordButton.className = 'discord-button';
        discordButton.addEventListener('click', openDiscord);
        popupWindow.document.body.appendChild(discordButton);
    } else {
        console.error('Failed to open popup window');
    }
})();
