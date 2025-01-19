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
      loginName.onkeyup = function () {
        if (loginName.value.length > 0) {
          loginBtn.classList.add("enabled");
        } else {
          loginBtn.classList.remove("enabled");
        }
      };
    }
  }
  var App = new Chat();
  App.createLoginPage();
};
