async function deleteMessage(id) {
    const response = await fetch(`/gmailApiRequest/getMessageById/:${id}`);
    const data = await response.json();
    console.log('Emails:', data);
    const lettersContainer = document.querySelector('.js-letters-list');
    const emailsList = data.map(email => {
        return `<li class="letters-list__content-item js-letter-item" data-message-id=${getInfo('id', email)}>
            <div class="letters-list__head">
                <p class="letters-list__head-name">${getInfo('name', email)}</p>
                <p class="letters-list__head-time">${getInfo('date', email)}</p>
            </div>
            <p class="letters-list__letter-title">${getInfo('title', email)}</p>
            <p class="letters-list__body">${getInfo('body', email)}</p>
        </li>`;
    }).join('');

    lettersContainer.innerHTML = emailsList;
}

export default deleteMessage;