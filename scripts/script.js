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

/* REVISAR ESSAS FUNÇÕES 
function checkUserStatus() {
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
let count = 0;

console.log(serverAwnser);

function generateMessage(serverAwnser) {
    console.log(serverAwnser);
    userName = serverAwnser.data[count].from;
    messageTo = serverAwnser.data[count].to;
    messageText = serverAwnser.data[count].text;
    messageTime = serverAwnser.data[count].time;
    statusMsg = serverAwnser.data[count].type;
    serverMessages();
}

function checkMsgAPI() {
    if (count < 100){
        count++;
        console.log(count);
    }
    generateMessage();
}

//var interval = window.setInterval(checkMsgAPI, 1000);

function serverMessages() {
    const main = document.querySelector("main");
    main.innerHTML = "";
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
let msgType = 'message';
let objMsg = {
    from: yourName,
    to: 'Todos',
    /* text: userMsg,
    type: msgType */
};
console.log(objMsg);

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




/*let classes;
function msgStatus {
    if (statusMsg === 'status'){
        
    } else
} */
