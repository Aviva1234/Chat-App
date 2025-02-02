window.onload = function () {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCVQmssMLHEYf1vTpGOsMjVjZK5K3eYZdQ",
    authDomain: "chat-app-4f54d.firebaseapp.com",
    databaseURL:
      "https://chat-app-4f54d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-app-4f54d",
    storageBucket: "chat-app-4f54d.firebasestorage.app",
    messagingSenderId: "344634045325",
    appId: "1:344634045325:web:6c9cd53935984e69c3c3c4",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.database();
  class Chat {
    home() {
      document.body.innerHTML = "";
      this.createLoginPage();
      this.createTitle();
    }
    chat() {
      this.createTitle();
      this.createChat();
    }
    createTitle() {
      var titleDiv = document.createElement("div");
      titleDiv.setAttribute("id", "titleDiv");
      titleDiv.setAttribute("class", "bg-info");
      var title = document.createElement("h1");
      title.setAttribute("id", "title");
      title.textContent = "Chat App";
      var titleCenter = document.createElement("center");
      titleDiv.append(title);
      titleCenter.append(titleDiv);
      document.body.append(titleCenter);
    }
    createLoader(containerId) {
      var parent = this;
      var container = document.getElementById(containerId);
      container.innerHTML = "";
      var loaderContainer = document.createElement("div");
      loaderContainer.setAttribute("class", "loader_container");
      var loader = document.createElement("div");
      loader.setAttribute("class", "loader");
      loaderContainer.append(loader);
      container.append(loaderContainer);
    }
    createChat() {
      var parent = this;
      var titleContainer = document.getElementById("titleDiv");
      var title = document.getElementById("title");
      titleContainer.classList.add("chat_title_Container");
      title.classList.add("chat_title");
      var chat_container = document.createElement("div");
      chat_container.setAttribute("id", "chat_container");

      var chat_inner_container = document.createElement("div");
      chat_inner_container.setAttribute("id", "chat_inner_container");

      var chat_content_container = document.createElement("div");
      chat_content_container.setAttribute("id", "chat_content_container");

      var chat_input_container = document.createElement("div");
      chat_input_container.setAttribute("id", "chat_input_container");

      var chat_input_send = document.createElement("button");
      chat_input_send.setAttribute("id", "chat_input_send");

      chat_input_send.setAttribute("disabled", true);
      chat_input_send.innerHTML = `<p class="">SEND</p>`;

      var chat_input = document.createElement("input");
      chat_input.setAttribute("id", "chat_input");
      // Only a max message length of 1000
      chat_input.setAttribute("maxlength", 1000);
      // Get the name of the user
      chat_input.placeholder = `${parent.get_name()}. Say something...`;
      chat_input.onkeyup = function () {
        if (chat_input.value.length > 0) {
          chat_input_send.removeAttribute("disabled");
          chat_input_send.classList.add("enabled");
          chat_input_send.onclick = function () {
            chat_input_send.setAttribute("disabled", true);
            chat_input_send.classList.remove("enabled");
            if (chat_input.value.length <= 0) {
              return;
            }
            parent.createLoader("chat_content_container");
            parent.send_message(chat_input.value);
            chat_input.value = 0;
            chat_input.focus();
          };
        } else {
          chat_input.send.classList.remove("enabled");
        }
      };
      var chat_logout_container = document.createElement("div");
      chat_logout_container.setAttribute("id", "chat_logout_container");

      var chat_logout = document.createElement("button");
      chat_logout.setAttribute("id", "chat_logout");
      chat_logout.textContent = `${parent.get_name()} • logout`;
      chat_logout.onclick = function () {
        localStorage.clear();
        parent.home();
      };
      chat_logout_container.append(chat_logout);
      chat_input_container.append(chat_input, chat_input_send);
      chat_inner_container.append(
        chat_content_container,
        chat_input_container,
        chat_logout_container
      );
      chat_container.append(chat_inner_container);
      document.body.append(chat_container);
      parent.createLoader("chat_content_contaier");
    }
    save_name(name) {
      localStorage.setItem("name", name);
    }
    get_name() {
      if (localStorage.getItem("name") != null) {
        return localStorage.getItem("name");
      } else {
        this.home();
        return null;
      }
    }
    createLoginPage() {
      var parent = this;
      var loginDiv = document.createElement("div");
      loginDiv.setAttribute("id", "loginDiv");
      var loginName = document.createElement("input");
      loginName.setAttribute("type", "text");
      loginName.setAttribute("id", "LoginName");
      loginName.setAttribute("class", "bg-info-subtle");
      loginName.placeholder = "Type A Name";
      loginDiv.append(loginName);
      var loginBtn = document.createElement("button");
      loginBtn.setAttribute("id", "loginBtn");
      loginBtn.setAttribute("class", "btn btn-info");
      loginBtn.innerHTML = "Log In";
      loginDiv.append(loginBtn);
      document.body.append(loginDiv);
      var loginError = document.createElement("p");
      loginError.setAttribute("id", "loginError");
      loginDiv.append(loginError);
      //error = document.getElementById("")
      loginName.onkeyup = function () {
        if (loginName.value.length > 0) {
          loginBtn.classList.add("enabled");
          console.log(loginName.value.length);
          loginBtn.onclick = function () {
            parent.save_name(loginName.value);
            loginDiv.remove();
            parent.createChat();
          };
        } else {
          console.log(loginName.value.length);
          loginBtn.classList.remove("enabled");
          console.log(loginError.innerHTML);
        }
        loginBtn.addEventListener("click", checkForError());
      };

      function checkForError() {
        if (loginName.value.length > 0) {
          loginError.innerHTML = "";
          //document.getElementById("loginError").innerHTML = "";
          // loginError.remove();
        } else if (loginName.value.length === 0) {
          //loginError = document.createElement("p");
          //document.getElementById("loginError").innerHTML =
          loginError.innerHTML = "Please enter a name.";
          //loginError.setAttribute("id", "loginError");
          //loginDiv.append(loginError);
        }
      }
      //loginBtn.addEventListener("click", checkForError());
    }
  }
  var App = new Chat();
  if (App.get_name() != null) {
    App.chat();
  }
};
