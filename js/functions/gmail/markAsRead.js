function markAsRead() {
    setTimeout(()=> {
        const letters = document.querySelectorAll('.js-letter-item.unread');
        for (let letter of letters) {
            letter.addEventListener('click', async () => {
                const messageId = letter.getAttribute('data-message-id');

                try {
                    const response = await fetch('http://localhost:3001/gmailApiRequest/markAsRead', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ messageId })
                    });

                    if (response.ok) {
                        letter.classList.remove('unread');
                        letter.classList.add('read');
                    } else {
                        console.error('Failed to mark message as read');
                    }
                } catch (error) {
                    console.error('Error marking message as read:', error);
                }
            });
        }
    },2000)
}

export default markAsRead;