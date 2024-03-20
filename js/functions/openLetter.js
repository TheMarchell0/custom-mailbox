function openLetter() {
    setTimeout(()=> {
        const letters = document.querySelectorAll('.js-letter-item')
        for (let letter of letters) {
            letter.addEventListener('click', ()=> {
                letters.forEach(otherLetter => {
                    if (otherLetter !== letter) {
                        otherLetter.classList.remove('active');
                    }
                });
                letter.classList.add('active');
            })
        }
    },2000)
}

export default openLetter;