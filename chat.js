"use strict"
const socket = io();

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container")
let num_count

socket.on('usercount', (count) => {
  num_count = count;
  var userCounter = document.getElementById('usercount');
  userCounter.innerText = "현재 " + count + "명이 서버에 접속해있습니다.";
});

chatInput.addEventListener("keypress", (event)=>{
  if(event.keyCode===13 && !event.shiftKey){
    send()
  }
})

function send(){
  const param = {
    name: "사용자" + nickname.value,
    msg: chatInput.value,
  }
  socket.emit("chatting", param)
  chatInput.value = null;
}

sendButton.addEventListener("click", ()=>{
  send()
})

// socket.on('connect', function() {
//   var name = prompt('hi', '');
//   /* 서버에 새로운 유저가 왔다고 알림 */
//   socket.emit('newUser', name)
// })

socket.on("chatting", (data)=>{
  const {name, msg, time} = data
  const item = new LiModel(name, msg, time);
  item.makeLi()
  displayContainer.scrollTo(0, displayContainer.scrollHeight);
})

function LiModel(name, msg, time){
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = ()=>{
    const li = document.createElement('li');
    li.classList.add("사용자"+nickname.value === this.name ? "sent" : "received")
    const dom = `<span class="profile">
    <span class="user">${this.name}</span>
    <img src="https://placeimg.com/50/50/any" alt="any" class="image">
  </span>
  <span class="message">${this.msg}</span>
  <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li)
  }
}