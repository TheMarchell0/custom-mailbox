function getMessageContent() {
    setTimeout(()=> {
        document.querySelectorAll('.js-letter-item').forEach(item => {
            item.addEventListener('click', async () => {
                const messageId = item.getAttribute('data-message-id');
                try {
                    const response = await fetch('http://localhost:3001/gmailApiRequest/openMessage', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ messageId: messageId })
                    });
                    const data = await response.json();
                    console.log(data)
                    const openedMessageBlock = document.querySelector('.opened-message');
                    openedMessageBlock.innerHTML =
                        `<h2>${data.payload.headers.find(header => header.name === 'Subject').value}</h2>
                    <p>${data.snippet}</p>`
                    ;
                } catch (error) {
                    console.error(error);
                }
            });
        });
        console.log('rabota')
    }, 2000)
}

export default getMessageContent;