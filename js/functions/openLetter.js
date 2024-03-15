let letters = document.querySelectorAll('.js-letter-item');
let emptyMessage = document.querySelector('.js-letter-content-empty');
let openedMessage = document.querySelector('.js-opened-message-content');

function openLetter() {
    for (let letter of letters) {
        letter.addEventListener('click', ()=> {
            letters.forEach(otherLetter => {
                if (otherLetter !== letter) {
                    otherLetter.classList.remove('letters-list__content-item_active');
                }
            });
            letter.classList.add('letters-list__content-item_active');
            emptyMessage.classList.add('disable')
            openedMessage.classList.remove('letter-content__container_disable')
        })
    }
}

export default openLetter;