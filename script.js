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
      chat_input_send.setAttribute("class", "btn btn-info");

      chat_input_send.setAttribute("disabled", true);
      chat_input_send.innerHTML = `<p class="">SEND</p>`;

      var history_delete = document.createElement("button");
      history_delete.setAttribute("class", "history_delete");
      history_delete.onclick = function () {
        db.ref("chats/").remove();
      };
      history_delete.innerHTML = "Delete";
      chat_input_container.append(history_delete);

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
            parent.sendMessage(chat_input.value);
            chat_input.value = 0;
            chat_input.focus();
          };
        } else {
          chat_input_send.classList.remove("enabled");
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
      parent.createLoader("chat_content_container");
      parent.refreshChat();
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
    sendMessage(message) {
      parent = this;
      if (parent.get_name() == null && message == null) {
        return;
      }
      db.ref("chats/").once("value", function (msg) {
        var index = parseFloat(msg.numChildren()) + 1;
        db.ref("chats/" + `message_${index}`)
          .set({
            name: parent.get_name(),
            message: message,
            index: index,
          })
          .then(function () {
            parent.refreshChat();
          });
      });
    }

    refreshChat() {
      var chat_content_container = document.getElementById(
        "chat_content_container"
      );
      db.ref("chats/").on("value", function (msg) {
        chat_content_container.innerHTML = "";
        if (msg.numChildren() == 0) {
          return;
        }
        var messages = Object.values(msg.val());
        var guide = [];
        var unordered = [];
        var ordered = [];
        for (var i = 0; i < messages.length; i++) {
          guide.push(i + 1);
          unordered.push([messages[i], messages[i].index]);
        }
        guide.forEach(function (key) {
          var found = false;
          unordered = unordered.filter(function (item) {
            if (!found && item[1] == key) {
              ordered.push(item[0]);
              found = true;
              return false;
            } else {
              return true;
            }
          });
        });

        ordered.forEach(function (data) {
          var name = data.name;
          var message = data.message;
          var message_container = document.createElement("div");
          message_container.setAttribute("class", "message_container");

          var message_inner_container = document.createElement("div");
          message_inner_container.setAttribute(
            "class",
            "message_inner_container"
          );

          var message_user_container = document.createElement("div");
          message_user_container.setAttribute(
            "class",
            "message_user_container"
          );
          var message_user = document.createElement("p");
          message_user.setAttribute("class", "message_user");
          message_user.textContent = `${name}`;

          var message_content_container = document.createElement("div");
          message_content_container.setAttribute(
            "class",
            "message_content_container"
          );

          var message_content = document.createElement("p");
          message_content.setAttribute("class", "message_content");
          message_content.textContent = `${message}`;

          message_user_container.append(message_user);
          message_content_container.append(message_content);
          message_inner_container.append(
            message_user_container,
            message_content_container
          );
          message_container.append(message_inner_container);

          chat_content_container.append(message_container);
        });

        chat_content_container.scrollTop = chat_content_container.scrollHeight;
      });
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
