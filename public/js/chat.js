const socket = io("http://localhost:3000");
let idChatRoom = "";

/*socket.on("chat_iniciado", (data) => {
  console.log(data);
})*/

function onLoad() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  const avatar = urlParams.get("avatar");
  const email = urlParams.get("email");

  document.querySelector(".user_logged").innerHTML+= `
  <img
    class="avatar_user_logged"
    src=${avatar}
  />
  <strong id="user_logged">${name}</strong> 
  `

  socket.emit("start", {
    email,
    name,
    avatar,
  });

  socket.on("new_users", (user) => {
    const existInDiv = document.getElementById(`user_${user._id}`);

    if(!existInDiv){
      addUser(user);
    }
  })

  socket.emit("get_users", (users) => {
    //console.log("getUsers: ", users)

    users.map( (user) => {
      if ( user.email !== email){
        addUser(user)
      }
    });
  });

  socket.on("message", (data) => {
    //console.log(data)
    if(data.message.roomId === idChatRoom){
      addMessage(data)
    }
  });

  // Classe com a bolinha de notificação
  socket.on("notification", (data) => {
    console.log('data: ',data)
    if(data.roomId !== idChatRoom){
      const user = document.getElementById(`user_${data.from._id}`);
      
      user.insertAdjacentHTML(
        "afterbegin",
        `<div class="notification"></div>`
      );
    }

  });

}

document.getElementById("users_list").addEventListener("click", (e) => {
  const inputMessage = document.getElementById("user_message");
  inputMessage.classList.remove("hidden");

  document
    .querySelectorAll("li.user_name_list")
    .forEach( (item) => item.classList.remove("user_in_focus"))
  
  document.getElementById("message_user").innerHTML = "";

  if(e.target && e.target.matches("li.user_name_list")){
    const idUser = e.target.getAttribute("idUser");
    //console.log("idUser: ",idUser)
    e.target.classList.add("user_in_focus");

    // Remove a bolinha de notificação
    const notification = document.querySelector(`#user_${idUser} .notification`);
    if(notification){
      notification.remove();
    }

    socket.emit("start_chat", {idUser},  (response) => {
      //console.log(response);
      idChatRoom = response.room.idChatRoom;

      response.messages.forEach( (message) => {
        const data = {
          message,
          user: message.to,
        };

        addMessage(data);
      });
    });
  }

});

document.getElementById("user_message").addEventListener("keypress", (e) => {
  if(e.key === "Enter"){
    const message = e.target.value;
    //console.log("Message: "+ message);
    e.target.value = "";

    const data = {
      message,
      idChatRoom,
    };

    socket.emit("message", data)
  }
});

function addMessage(data){
  const divMessageUser = document.getElementById("message_user");

  divMessageUser.innerHTML += `
  <span class="user_name user_name_date">
    <img class="img_user" src=${data.user.avatar}  />

    <strong>${data.user.name } &nbsp; </strong>
    <span> ${dayjs(data.message.created_at).format("DD/MM/YYYY HH:mm")}</span></span>
  <div class="messages">
    <span class="chat_message">${data.message.text}</span>
  </div> 
  `
}


function addUser(user){
  const usersList = document.getElementById("users_list");
  
  usersList.innerHTML += `
  <li
    class="user_name_list"
    id="user_${user._id}"
    idUser="${user._id}"
  >
    <img
      class="nav_avatar"
      src=${user.avatar}
    />
    ${user.name}
  </li> 
    `
}


onLoad();