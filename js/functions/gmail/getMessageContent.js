import createMessageBody from "./helpers/createMessageBody.js";

const emptyCover = document.querySelector('.js-letter-content-empty'),
    messageBlock = document.querySelector('.js-opened-message-content'),
    deleteButton = document.querySelector('.js-delete-button');

function getMessageContent() {
    setTimeout(() => {
        document.querySelectorAll('.js-letter-item').forEach(item => {
            item.addEventListener('click', async () => {
                if (!emptyCover.classList.contains('disable')) {
                    emptyCover.classList.add('disable');
                    messageBlock.classList.remove('disable');
                    deleteButton.classList.remove('disable');
                }
                const messageId = item.getAttribute('data-message-id');
                deleteButton.setAttribute("data-message-id", messageId);
                try {
                    const response = await fetch('http://localhost:3001/gmailApiRequest/openMessage', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({messageId: messageId})
                    });
                    const data = await response.json();
                    const openedMessageBlock = document.querySelector('.opened-message');
                    openedMessageBlock.innerHTML = createMessageBody(data, messageId);
                    ;
                } catch (error) {
                    console.error(error);
                }
            });
        });
    }, 2000)
}

export default getMessageContent;