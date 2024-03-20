import getMessagesList from "./getMessagesList.js";
import getMessageContent from "./getMessageContent.js";
import markAsRead from "./markAsRead.js";

function sendMessage() {
    const button = document.querySelector('.js-submit'),
        to = document.querySelector('.js-new-letter-recipient'),
        subject = document.querySelector('.js-new-letter-title'),
        message = document.querySelector('.js-new-letter-body');

    button.addEventListener('click', async () => {
        const recipientContent = to.value;
        const subjectContent = subject.value;
        const messageContent = message.value;

        const response = await fetch('http://localhost:3001/gmailApiRequest/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipientContent, subjectContent, messageContent }), // Передача созданного письма
        });

        if (response.ok) {
            console.log('Email sent successfully!');
        } else {
            console.error('Failed to send email.');
        }
    });
}

export default sendMessage;