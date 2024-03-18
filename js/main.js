import writeLetter from "./functions/writeLetter.js";
import openLetter from "./functions/openLetter.js";
import gmailApiCall from "./functions/gmailApiCall.js";

document.addEventListener("DOMContentLoaded", function () {
    writeLetter();
    openLetter();
    gmailApiCall();
});