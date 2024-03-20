const tabs = document.querySelectorAll('.js-tab'),
    emptyMessage = document.querySelector('.js-letter-content-empty'),
    openedMessage = document.querySelector('.js-opened-message-content'),
    incomingLettersList = document.querySelector('.js-incoming-letters-list'),
    sentLettersList = document.querySelector('.js-sent-letters-list'),
    deleteButton = document.querySelector('.js-delete-button');

function switchTabs() {
    for (let tab of tabs) {
        tab.addEventListener('click', ()=> {
            tabs.forEach(otherTab => {
                if (otherTab !== tab) {
                    otherTab.classList.remove('active');
                }
            });
            tab.classList.add('active');
            emptyMessage.classList.remove('disable');
            openedMessage.classList.add('disable');
            if (tab.classList.contains('js-tab-sent')) {
                if (!incomingLettersList.classList.contains('disable') && sentLettersList.classList.contains('disable')) {
                    incomingLettersList.classList.add('disable');
                    sentLettersList.classList.remove('disable');
                    deleteButton.classList.add('disable');
                }
            }  else  {
                if (incomingLettersList.classList.contains('disable') && !sentLettersList.classList.contains('disable')) {
                    incomingLettersList.classList.remove('disable');
                    sentLettersList.classList.add('disable');
                    deleteButton.classList.remove('disable');
                }
            }
        })
    }
}

export default switchTabs;