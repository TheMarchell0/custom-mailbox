async function getMessagesList() {
    const response = await fetch('http://localhost:3001/gmailApiRequest/getMessagesList');
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

function getInfo(infoType, subject) {
    switch (infoType) {
        case 'id':
            return subject.id;
        case 'title':
            return subject.payload.headers.find(header => header.name === 'Subject').value;
        case 'name':
            return subject.payload.headers.find(header => header.name === 'From').value.replace(/"/g, '').replace(/<[^>]*>/g, '');
        case 'date':
            return getDate(subject.payload.headers.find(header => header.name === 'Date').value);
        case 'body':
            return subject.snippet;
        default:
            console.log('Unknown');
    }
}
const month = {'Jan':'Января', 'Feb':'Февраля', 'Mar':'Марта', 'Apr':'Апреля', 'May':'Мая', 'Jun':'Июня', 'Jul':'Июля', 'Aug':'Августа', 'Sep':'Сентября', 'Oct':'Октября', 'Nov':'Ноября', 'Dec':'Декабря'};
function getDate(date) {
    const time = date.split(' ');
    return `${getCurrentTime(time[4].slice(0, 5))}, ${time[1]+' '+month[time[2]]}`;
}

function getCurrentTime(time) {
    let [hours, minutes] = time.split(':');
    hours = hours < 10 ? '0'+(hours-1) : hours-1;
    return hours+':'+minutes;
}

export default getMessagesList;