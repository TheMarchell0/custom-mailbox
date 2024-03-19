function createEmail(recipientContent, subjectContent, messageContent) {
    const emailLines = [
        `To: ${recipientContent}`,
        'Content-Type: text/plain; charset="UTF-8"',
        'MIME-Version: 1.0',
        `Subject: ${subjectContent}`,
        '',
        `${messageContent}`
    ];

    return emailLines.join('\r\n');
}

module.exports = createEmail;