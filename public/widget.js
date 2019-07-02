var src = document.currentScript.getAttribute('widget');
var buttonText = document.currentScript.getAttribute('buttontext');
var buttonColor = document.currentScript.getAttribute('buttoncolor');
var widgetColor = document.currentScript.getAttribute('data-background');
var previewText = document.currentScript.getAttribute('data-preview');

const inframeMain = (`
  <div
    style="position: fixed;
    right: 35px;
    display: flex;
    box-shadow: 1px 1px 100px 2px rgba(0, 0, 0, 0.22);
    transition: all .2s ease-in-out;
    bottom: 55px;
    border-radius: 10px 10px 0px 0px;
    flex-direction: column;"
    
    id="div__botkits" class="widget__main--inframe">
    <div class="preview__text" 
      style="background-color: ${widgetColor};
      height: 55px;
      display: flex;
      align-items: center;
      font-family: Arial;
      font-size: 14px;
      padding-left: 10px;
      color: white;">
      ${previewText}
    </div>
    <iframe id="iframe__botkits" scrolling="no" src=${src}></iframe>
  </div>`);

const showButton = document.createElement('button');
showButton.classList.add("widget__button");
showButton.innerHTML = buttonText;
document.body.appendChild(showButton);

showButton.style.cssText = `
  position: fixed;
  right: 40px;
  bottom: 40px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #323ba5;
  cursor: pointer;
  traisition: box-shadow .2s ease-in;
  border: none;`;

var widgetButton = document.querySelector('.widget__button');
var newLi = document.createElement('div');
newLi.innerHTML = ` 
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="30"
  height="30"
  viewBox="0 0 68.933 68.939">

  <g id="chat" transform="translate(-0.019)">
    <g  transform="translate(0.019)">
       <path d="M58.837,10.1A34.461,34.461,0,0,0,7.927,
          56.448,13.187,13.187,0,0,1,2.4,62.569a3.233,3.233,
          0,0,0,.933,6.092,17.813,17.813,0,0,0,2.725.2,20.577,
          20.577,0,0,0,12.126-4.023A34.458,34.458,0,0,0,58.837,
          10.1ZM56.053,56.055A30.526,30.526,0,0,1,19,60.806a1.959,
          1.959,0,0,0-2.39.306.647.647,0,0,0-.16.117,16.827,
          16.827,0,0,1-10.392,3.7H6.047a19.3,19.3,0,0,0,5.917-7.856,
          2.013,2.013,0,0,0,.1-1.268,2.046,2.046,0,0,0-.481-1.108,
          30.529,30.529,0,1,1,44.468,1.355Z" transform="translate(-0.019)" fill="#fff"/>

          <circle cx="2.419" cy="2.419" r="2.419" transform="translate(32.03 32.05)" fill="#fff"/>
          <circle cx="2.419" cy="2.419" r="2.419" transform="translate(44.506 32.05)" fill="#fff"/>
          <circle cx="2.419" cy="2.419" r="2.419" transform="translate(19.554 32.05)" fill="#fff"/>
       </g>
      </g>
   </svg>`;

widgetButton .appendChild(newLi);

const closeButton = document.createElement('button');
closeButton.innerHTML = '&#10006;';
closeButton.style.cssText = `border: none;
  display: inline-block;
  position: absolute;
  left: -44px;
  top: 0;
  color: black;
  z-index: 999;
  cursor:  pointer;
  transition: all .3s;
  border: 1px solid #a4a4a4;
  border-radius:  50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-align: center;
  font-size: 15px;
  background: none;`;

// Показать Inframe

widgetButton.addEventListener("mouseover", () => {
  widgetButton.style.backgroundColor = "rgb(36, 44, 137)";
}, false);

widgetButton.addEventListener("mouseout", () => {
  widgetButton.style.backgroundColor = "#323ba5";
}, false);

widgetButton.addEventListener("mousemove", () => {
  widgetButton.style.outline = "none";
}, false);

const onShowIframeHandler =  () => {
  document.body.insertAdjacentHTML('afterbegin', inframeMain);
  let div__botkits = document.getElementById('div__botkits');
  div__botkits.appendChild(closeButton);

  let inframe = document.getElementById('iframe__botkits');
  inframe.style.cssText = `
      width: 356px;
      height: 518px;
      transition: height 350ms ease-in-out;
      border: none;`;
  showButton.setAttribute('hidden', true);
};

// Закрыть inframe

const onCloseIframeHandler =  () => {
  let div__botkits = document.getElementById('div__botkits');
  document.body.removeChild(div__botkits);
  showButton.hidden = false;
};

closeButton.addEventListener('click', onCloseIframeHandler );
showButton.addEventListener('click', onShowIframeHandler);
showButton.addEventListener('click',  (event) => {
  event.target.style.outline = 'none';
});
