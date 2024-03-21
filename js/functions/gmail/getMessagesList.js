import createEmailsList from "./helpers/createEmailsList.js";

const incomingLettersContainer = document.querySelector('.js-incoming-letters-list');
const sentLettersContainer = document.querySelector('.js-sent-letters-list'),
    sentLettersCount = document.querySelector('.js-sent-letters-statistic');

async function getMessagesList() {
    const incomingLettersResponse = await fetch('http://localhost:3001/gmailApiRequest/getIncomingMessages');
    const incomingLettersData = await incomingLettersResponse.json();
    const sentLettersResponse = await fetch('http://localhost:3001/gmailApiRequest/getSentMessages');
    const sentLettersData = await sentLettersResponse.json();
    sentLettersCount.innerHTML = sentLettersData.length;
    incomingLettersContainer.innerHTML = createEmailsList(incomingLettersData);
    sentLettersContainer.innerHTML = createEmailsList(sentLettersData);
}

export default getMessagesList;