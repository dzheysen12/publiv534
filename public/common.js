const mainChat = document.querySelector('.wrap__chat--main');
const chatPopover = document.getElementById("chat__popover");
const iconCross = document.querySelector('.icon__cross');
const iconChat = document.getElementById('icon__chat');
const form = document.querySelector('.form');
const messageInput = document.querySelector('.message__send--input');
const messageList = document.querySelector('.wrap__message--list');
const messageBtn = document.querySelector('.message__send--btn');
const messageSendInput = document.querySelector('.message__send--input');


var address = document.location.href;
var message = [];


function searchToObj(search) {
  var search = search || window.location.search.substring(1);
  if (search) {
    try {
      return JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function (key, value) {
          return key === "" ? value : decodeURIComponent(value);
        })
    } catch (e) {
      return {};
    }
  } else {
    return {};
  }
}

const params = searchToObj();
var bots = {};
if (params.bots && typeof params.bots === 'string') {
  bots = JSON.parse(params.bots);
}

const messageReception = (message) => {
  return message;
};

// Шаблон отправки сообщения ботом
onMessageBotHandler = () => {

  let date = new Date();

  setTimeout(() => {
    messageList.insertAdjacentHTML("beforeEnd", `
    <div class="list-item flex-end">
     <div class="message">
       <div class="message__overlay">
         <div class="avatar__message">
           <img src="chat.jpg" alt="">
          </div>
          
           <div>
             <div class="text__message bot">
               ${this.message}
             </div>

             <div class="date__message">
             ${date.getHours()}:${date.getMinutes()}
             </div>
           </div>
       </div>
     </div>
    </div>`);

  }, 1000 + (Math.random() * 20) * 100);
};

// Шаблон отправки сообщения user

onMessageTemplateHandler = (e, data, url) => {
  e.preventDefault();
//debugger
  let src = 'https://dfgfdfgdf.herokuapp.com/webhook/send_message';

  let date = new Date();
  var messageValue = messageSendInput.value;

  fetch(src, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      botid: this.bots,
      text: messageValue
    })
  }).then(res => res.json())
    .then(res => {
     message = res.data
      console.log(res.data)
    });

  if (messageValue.trim() === '') {
    return false;
  }
//debugger
  if (messageValue ) {
    messageList.insertAdjacentHTML("beforeEnd", `
    <div class="list-item flex-start">
      <div class="message">
        <div class="text__message you">
          ${messageValue}
        </div>

        <div class="date__message">
          ${date.getHours()}:${date.getMinutes()}
        </div>
      </div>
    </div>`);
  }

  else if(messageValue !== '') {
    return false;
  }
  setTimeout(() => {
    onMessageBotHandler();
  }, 1000 + (Math.random() * 10) * 100);


};

// Сообщения прилепают вниз

onScrollToBottom = () => {

  messageList.maxScrollTop = messageList.scrollHeight - messageList.offsetHeight;
  if (messageList.maxScrollTop - messageList.scrollTop <= messageList.offsetHeight) {
    messageList.scrollTop = messageList.scrollHeight;
  }
};

//  при нажатии клавиши если value > 0 добавляется класс

// onKeyHandler = () => {
//  var test =  messageValue;
//  console.log(test);
//    if (test => 0) {
//      $('.message__send--btn').addClass("circle");
//    }
// };

//document.addEventListener('DOMContentLoaded',onMessageBotHandler);
messageBtn.addEventListener('click', onMessageTemplateHandler);
form.addEventListener('submit', onMessageTemplateHandler);
form.addEventListener('submit', onScrollToBottom);






