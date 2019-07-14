const messageList = document.querySelector('.wrap__message--list');
const messageSendInput = document.querySelector('.message__send--input');

var message;
var messageLocale = localStorage["Ключ"];
var localValue;

var messageListLocal = [];

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


// Шаблон отправки сообщения user

messageSendInput.addEventListener("keyup", function(event, data, url) {
  event.preventDefault();
  if (event.keyCode === 13) {


    var data
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
        botid: bots,
        text: messageValue
      })
    }).then(res => res.json())
      .then(res => {
        message = res.data;
      });


    if (messageValue.trim() === '') {
      return false;
    }

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
    messageSendInput.value = '';
    setTimeout(() => {
      onScrollToBottom();
      onMessageBotHandler();
    }, 600 );
  }
});


// Шаблон отправки сообщения ботом
onMessageBotHandler = () => {

  let date = new Date();
  var minutes =  date.getMinutes();
  let timeNode;
  console.log(timeNode);
   if (minutes < 10) {
     minutes = `${0}${minutes}`

   }
   if(minutes > 10) {
     minutes
   }

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
             ${date.getHours()}:${minutes}
             </div>
           </div>
       </div>
     </div>
    </div>`);

  }, 600);
};


// Сообщения прилепают вниз
onScrollToBottom = () => {
  messageList.maxScrollTop = messageList.scrollHeight - messageList.offsetHeight;
  if (messageList.maxScrollTop - messageList.scrollTop <= messageList.offsetHeight) {
    messageList.scrollTop = messageList.scrollHeight;
  }
};





