import writeLetter from "./functions/writeLetter.js";
import openLetter from "./functions/openLetter.js";
import getMessagesList from "./functions/gmail/getMessagesList.js";
import getMessageContent from "./functions/gmail/getMessageContent.js";
import sendMessage from "./functions/gmail/sendMessage.js";

document.addEventListener("DOMContentLoaded", function () {
    writeLetter();
    openLetter();
    getMessagesList();
    getMessageContent();
    sendMessage();
});