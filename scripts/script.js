let yourName = null;
let objName = { name: '' };

window.onload = chooseAName ();

function chooseAName() {
    objName.name = prompt("Digite seu nome: ");
    yourName = objName.name;
    const request = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', objName);
    request.then(validName);
    request.catch(chooseANameAgain);
}

function validName(serverAwnser) {
    if (serverAwnser.status === 200) {
        alert("Nome disponível!");
    }
    //checkUserStatus();
}

function chooseANameAgain(serverAwnser) {
    if (serverAwnser.status !== 200) {
        alert("Nome indiponível, por favor escolha outro nome.");
    }
    chooseAName();
}

/* function checkUserStatus() {
    const request = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', objName);
    request.then(userOnline);
    request.catch(userOffline);
}

function userOnline(requestAwnser) {
    if (serverAwnser.status === 200) {
        checkMsgAPI();
        console.log(requestAwnser)
    }
}

function userOffline() {
    if (serverAwnser.status !== 200) {
        const main = document.querySelector("main");
        main.innerHTML += `
        <div class="message msg inOut" data-identifier="message">
        <p class="date-time">(${messageTime})</p>
        <p><strong class="username">${userName}</strong> saiu da sala...</p>
        </div>`;
        scroll();
    }
    chooseAName()
}

var userOnline = window.setInterval(checkUserStatus, 5000); */

const promise = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
promise.then(generateMessage);

let userName = null;
let messageTo = null;
let messageText = null;
let messageTime = null;
let status = null;

function generateMessage(serverAwnser) {
    for (i = 0; i < 100; i++) {
        userName = serverAwnser.data[i].from;
        messageTo = serverAwnser.data[i].to;
        messageText = serverAwnser.data[i].text;
        messageTime = serverAwnser.data[i].time;
        statusMsg = serverAwnser.data[i].type;
    }

}

var interval = window.setInterval(checkMsgAPI, 3000);

function checkMsgAPI() {
    serverMessages(); //REMOVER O COMENTÁRIO PARA A FUNÇÃO VOLTAR AO NORMAL
}

function serverMessages() {
    const main = document.querySelector("main");
    main.innerHTML += `
    <div class="message msg" data-identifier="message">
    <p class="date-time">(${messageTime})</p>
    <p><strong class="username">${userName}</strong> para <strong class="messageTo">${messageTo}</strong>: ${messageText}</p>
</div>`;
    scroll();
}

function scroll() {
    let lastMessage = document.querySelector('.msg:last-child');
    lastMessage.scrollIntoView();
}

/* let UserMsgTime = null;
let userMsg = null;
let msgTo = 'Todos';
let msgType = 'message';
let objMsg = {
    from: yourName,
    to: msgTo,
    text: userMsg,
    type: msgType
}; */

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
    /* userMsg = document.querySelector('footer input').value;
    UserMsgTime = n;
    console.log(objMsg); */
}




/*let classes;
function msgStatus {
    if (statusMsg === 'status'){
        
    } else
} */

/*api: array
{
from: "João",
to: "Todos",
text: "entra na sala...",
type: "status",
time: "08:01:17"
}
*/