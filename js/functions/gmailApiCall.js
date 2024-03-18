const button = document.querySelector('.js-hello');

function gmailApiCall() {
    button.addEventListener('click', ()=> {
        Module.ccall('sayHello', 'void', [], []);
    })
}

export default gmailApiCall;