// ==UserScript==
// @name         JTOG V4 Item Creator
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Create custom items for JTOG V4
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
        const html = `
            <html>
            <head>
                <title>Create New Item</title>
                <script>
                    function createItem() {
                        const useJSON = document.getElementById("useJSON").checked;
                        if (useJSON) {
                            const jsonInput = document.getElementById("jsonInput").value;
                            try {
                                const newItem = JSON.parse(jsonInput);
                                addItemToLocalStorage(newItem);
                            } catch (error) {
                                alert("Invalid JSON input!");
                            }
                        } else {
                            const text = document.getElementById("text").value;
                            const emoji = document.getElementById("emoji").value;
                            const discovered = document.getElementById("discovered").checked;
                            const newItem = { text: text, emoji: emoji, discovered: discovered };
                            addItemToLocalStorage(newItem);
                        }
                    }

                    function addItemToLocalStorage(newItem) {
                        let items = localStorage.getItem("infinite-craft-data");
                        let existingItems = items ? JSON.parse(items).elements : [];
                        existingItems.push(newItem);
                        localStorage.setItem("infinite-craft-data", JSON.stringify({ elements: existingItems }));
                        window.opener.location.reload(); // Reload the main window
                        window.close(); // Close the popup window after creating the item
                    }
                </script>
            </head>
            <body>
                <h2>Create New Item</h2>
                <label><input type="checkbox" id="useJSON" name="useJSON"> Use JSON input</label><br><br>
                <div id="formFields">
                    <label for="text">Text:</label><br>
                    <input type="text" id="text" name="text"><br>
                    <label for="emoji">Emoji:</label><br>
                    <input type="text" id="emoji" name="emoji"><br>
                    <label for="discovered">Discovered:</label><br>
                    <input type="checkbox" id="discovered" name="discovered"><br><br>
                </div>
                <div id="jsonField" style="display: none;">
                    <label for="jsonInput">Enter JSON Data:</label><br>
                    <textarea id="jsonInput" rows="4" cols="50"></textarea><br><br>
                </div>
                <input type="button" value="Create" onclick="createItem()">
                <script>
                    document.getElementById("useJSON").addEventListener("change", function() {
                        const useJSON = document.getElementById("useJSON").checked;
                        if (useJSON) {
                            document.getElementById("formFields").style.display = "none";
                            document.getElementById("jsonField").style.display = "block";
                        } else {
                            document.getElementById("formFields").style.display = "block";
                            document.getElementById("jsonField").style.display = "none";
                        }
                    });
                </script>
            </body>
            </html>
        `;
        popup.document.write(html);
    }

    // Call the openPopup function when the script runs
    openPopup();

})();
