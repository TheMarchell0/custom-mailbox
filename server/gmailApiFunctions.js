const express = require('express');
const { google } = require('googleapis');
const credentials = require('../credentials/credentials.json');
const token = require('./token.json');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

const authorize = async () => {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    oAuth2Client.setCredentials(token);
    return oAuth2Client;
};

let gmail; // Глобальная переменная для хранения объекта gmail

const authorizeAndCreateGmail = async () => {
    const auth = await authorize();
    gmail = google.gmail({ version: 'v1', auth });
};

const listEmails = async () => {
    try {
        await authorizeAndCreateGmail();

        const response = await gmail.users.messages.list({
            userId: 'me',
        });

        const messages = response.data.messages;
        const detailedMessages = await Promise.all(messages.map(async (message) => {
            const detailedMessage = await gmail.users.messages.get({
                userId: 'me',
                id: message.id,
            });
            return detailedMessage.data;
        }));

        return detailedMessages;
    } catch (error) {
        console.error('Error fetching emails:', error);
        return [];
    }
};

app.get('/gmailApiRequest/getMessagesList', async (req, res) => {
    const messages = await listEmails();
    res.json(messages);
});

app.post('/gmailApiRequest/openMessage', async (req, res) => {
    const { messageId } = req.body;

    try {
        if (!gmail) {
            await authorizeAndCreateGmail();
        }

        const response = await gmail.users.messages.get({
            userId: 'me',
            id: messageId
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch message' });
    }
});

/*app.get('/gmailApiRequest/getMessageById/:messageId', async (req, res) => {
    const messageId = req.params.messageId;

    const getMessageById = async (messageId) => {
        const auth = await authorize();
        const gmail = google.gmail({ version: 'v1', auth });

        try {
            const response = await gmail.users.messages.get({
                userId: 'me',
                id: messageId,
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching email by ID:', error);
            return null;
        }
    };

    const message = await getMessageById(messageId);
    res.json(message);
});*/

app.listen(port, () => {console.log(`Server is running on http://localhost:${port}`)});