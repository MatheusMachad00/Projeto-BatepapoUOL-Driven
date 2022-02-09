let yourName = null;
function chooseAName() {
    let name = prompt("Digite seu nome: ");
    yourName = name;
}

const promise = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
promise.then(generateMessage);

/*function generateMessage(serverAwnser) {
    var userName = document.querySelector(".")
    var messageText = document.querySelector(".")
    var messageTime = document.querySelector(".")
    var messageTo = document.querySelector(".")
    
    userName.innerHTML = 
} */

/*function waitAwnser(serverAwnser) {
    console.log(serverAwnser.data);
} */

function sendMessage() {
    const main = document.querySelector('main');
    message = document.querySelector('footer input').value;
    main.innerHTML += `<div class="message" data-identifier="message">
    <p class="date-time">(09:21:45)</p>
    <p><strong class="username">${yourName}</strong> para <strong class="messageTo">joão</strong>: ${message}</p>
</div>`;
}