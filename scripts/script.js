let yourName = null;
let objName = {};

function chooseAName() {
    let name = prompt("Digite seu nome: ");
    let myObject = {
        name: name
    };
    yourName = name;
    objName = myObject;
    const request = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', objName);
    request.then(validName);
    request.catch(chooseANameAgain);
}

function validName(resposta) {
    if (resposta.status === 200) {
        alert("Nome disponível!");
    }
}

function chooseANameAgain(resposta) {
    if (resposta[2] !== 200) {
        alert("Nome indiponível, por favor escolha outro nome."); 
    }
    chooseAName()
}

const promise = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
promise.then(generateMessage);

let userName = null;
let messageTo = null;
let messageText = null;
let messageTime = null;
let status = null;

function generateMessage(serverAwnser) {
    for (i = 0; i < 100; i++) {
        /*console.log(i);
        console.log(serverAwnser.data[i].from); */
        userName = serverAwnser.data[i].from;
        messageTo = serverAwnser.data[i].to;
        messageText = serverAwnser.data[i].text;
        messageTime = serverAwnser.data[i].time;
        statusMsg = serverAwnser.data[i].type;
    }

}

var interval = window.setInterval(checkMsgAPI, 3000);

function checkMsgAPI() {
    //serverMessages(); //REMOVER O COMENTÁRIO PARA A FUNÇÃO VOLTAR AO NORMAL
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

let UserMsgTime = null;
let userMsg = null;

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

let objMsg = {};



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