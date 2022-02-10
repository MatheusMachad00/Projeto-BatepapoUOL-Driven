let yourName = null;
function chooseAName() {
    let name = prompt("Digite seu nome: ");
    yourName = name;
}

const promise = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
promise.then(generateMessage);

let userName = null;
let messageText = null;
let messageTime = null;
let messageTo = null;

function generateMessage(serverAwnser) {
    /*let userName = document.querySelector(".username")
    let messageText = document.querySelector(".messageTo")
    let messageTime = document.querySelector(".date-time")
    let messageTo = document.querySelector(".message") */
    
    console.log(serverAwnser.data);

    userName = serverAwnser.data.from;
    messageTo = serverAwnser.data.to;
    messageText = serverAwnser.data.text;
    messageTime = serverAwnser.data.time;
    console.log(userName);
    console.log(messageText);
    console.log(messageTime);
    console.log(messageTo);
}

/*function serverMessages(serverAwnser) {
    userName = serverAwnser.data.from;
    messageText = serverAwnser.data.text;
    messageTime = serverAwnser.data.time;
    messageTo = serverAwnser.data.to;

    const main = document.getElementById("#main");
    main.innerHTML += `
    <div class="message msgv" data-identifier="message">
    <p class="date-time">(${messageTime})</p>
    <p><strong class="username">${userName}</strong> para <strong class="messageTo">${messageTo}</strong>: ${messageText}</p>
</div>`;
} */

function scroll() {
    let lastMessage = document.querySelector('.msg:last-child');
    lastMessage.scrollIntoView();
}

function sendUserMessage() {
    var d = new Date();
    var n = d.toLocaleTimeString();
    const main = document.querySelector('main');
    message = document.querySelector('footer input').value;
    main.innerHTML += `
    <div class="message msg" data-identifier="message">
    <p class="date-time">(${n})</p>
    <p><strong class="username">${yourName}</strong> para <strong class="messageTo">todos</strong>: ${message}</p>
</div>`;
scroll();
}

/*api:
{
from: "João",
to: "Todos",
text: "entra na sala...",
type: "status",
time: "08:01:17"
}
*/

/*function generateMessage(serverAwnser) {
    console.log(serverAwnser.data);
} */