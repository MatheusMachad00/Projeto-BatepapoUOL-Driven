let yourName = null;
let objName = { name: '' };

window.onload = chooseAName();

function chooseAName() {
    objName.name = prompt("Digite seu nome: ");
    yourName = objName.name;
    const request = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', objName);
    request.then(validName);
    request.catch(chooseANameAgain);
}

function validName(serverAwnser) {
    var d = new Date();
    var n = d.toLocaleTimeString();
    if (serverAwnser.status === 200) {
        alert("Nome disponível!");
        const main = document.querySelector("main");
        main.innerHTML += `
        <div class="msg inOut" data-identifier="message">
        <p class="date-time">(${n})</p>
        <p><strong class="username">${yourName}</strong> entrou da sala...</p>
        </div>`;
        scroll();
    }
}

function chooseANameAgain(serverAwnser) {
    if (serverAwnser.status !== 200) {
        alert("Nome indiponível, por favor escolha outro nome.");
    }
    chooseAName();
}


function checkUserStatus() {
    const request = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', objName);
    request.then(userOnline);
    request.catch(userOffline);
}

function userOnline(requestAwnser) {
    if (serverAwnser.status === 200) {
        getMessageFromServer();
        genereateMessage();
    }
}

function userOffline() {
    if (serverAwnser.status !== 200) {
        const main = document.querySelector("main");
        main.innerHTML += `
        <div class="msg inOut" data-identifier="message">
        <p class="date-time">(${messageTime})</p>
        <p><strong class="username">${yourName}</strong> saiu da sala...</p>
        </div>`;
        scroll();
    }
    chooseAName()
}

var userOnline = window.setInterval(checkUserStatus, 5000);

function getMessageFromServer() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    promise.then(genereateMessage);
}

function genereateMessage(serverAnswer) {
    //console.log(serverAnswer);
    let main = document.querySelector("main");
    for (let count = 0; count < serverAnswer.data.length; count++) {
        main.innerHtml = "";
        if (serverAnswer.data[count].type === 'message') {
            main.innerHTML += `
            <div class="message msg" data-identifier="message">
            <p class="date-time">(${serverAnswer.data[count].time})</p>
            <p><strong class="username">${serverAnswer.data[count].from}</strong> para <strong class="messageTo">${serverAnswer.data[count].to}</strong>: ${serverAnswer.data[count].text}</p>
            </div>`;
        } else if (serverAnswer.data[count].type === 'status') {
            main.innerHTML += `
            <div class="inOut msg">
            <p class="date-time">(${serverAnswer.data[count].time})</p>
            <p><strong class="username">${serverAnswer.data[count].from}</strong> ${serverAnswer.data[count].text}</p>
            </div>`;
        }
    }
    scroll();
}

var interval = window.setInterval(getMessageFromServer, 3000);
var interval = window.setInterval(genereateMessage, 3000);

function scroll() {
    let lastMessage = document.querySelector('.msg:last-child');
    lastMessage.scrollIntoView();
}

let UserMsgTime = null;
let userMsg = null;
let objMsg = {
    from: yourName,
    to: 'Todos',
    text: document.querySelector('input').value,
    type: 'message'
};

function sendUserMessage() {
    var d = new Date();
    var n = d.toLocaleTimeString();
    const main = document.querySelector('main');
    objMsg.text = document.querySelector('input').value;
    main.innerHTML += `
    <div class="message msg" data-identifier="message">
    <p class="date-time">(${n})</p>
    <p><strong class="username">${yourName}</strong> para <strong class="messageTo">todos</strong>: ${objMsg.text}</p>
</div>`;
    scroll();
    sendUserMessageToServer();
}

function sendUserMessageToServer() {
    const request = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', objMsg);
    request.then(msgSent);
    request.catch(msgNotSent);
}

function msgSent(anwser) {
    if (anwser.status === 200) {
        getMessageFromServer();
        genereateMessage();
    }
}

function msgNotSent(anwser) {
    if (anwser.status !== 200) {
        alert("Usuário offline!")
        window.location.reload();
    }
}

var input = document.getElementById("myInput");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("myBtn").click();
    }
});