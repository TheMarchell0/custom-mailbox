import authValidation from "./functions/authValidation.js";
import preloader from "./functions/preloader.js";
import writeLetter from "./functions/writeLetter.js";
import openLetter from "./functions/openLetter.js";
import getMessagesList from "./functions/gmail/getMessagesList.js";
import getMessageContent from "./functions/gmail/getMessageContent.js";
import sendMessage from "./functions/gmail/sendMessage.js";
import switchTabs from "./functions/switchTabs.js";
import markAsRead from "./functions/gmail/markAsRead.js";
import deleteMessage from "./functions/gmail/deleteMessage.js";
import getMessagesCount from "./functions/gmail/helpers/getMessagesCount.js";
import logout from "./functions/logout.js";
import search from "./functions/search.js";

document.addEventListener("DOMContentLoaded", function () {
    authValidation();
    preloader();
    writeLetter();
    openLetter();
    getMessagesList();
    getMessageContent();
    sendMessage();
    switchTabs();
    markAsRead();
    deleteMessage();
    getMessagesCount();
    logout();
    search();
});