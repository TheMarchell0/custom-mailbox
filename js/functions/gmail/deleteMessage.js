async function deleteMessage(id) {
    const response = await fetch(`/gmailApiRequest/getMessageById/:${id}`);
}

export default deleteMessage;