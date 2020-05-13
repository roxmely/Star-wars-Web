<template>
  <div class="chat">
    <h1 v-if="auth" class="teal-text">
      Chat
      <span class="user1">de {{ auth.name }}</span>
      <br />
      <span class="user2">{{ data }}</span>
    </h1>

    <router-link to="/login" v-if="auth">
      <div class="logout">
        <v-btn class="logout1" @click="logOut" color="error">Log Out</v-btn>
      </div>
    </router-link>

    <div class="card">
      <div class="card-content"></div>
      <div class="card-action">
        <NewMessage />
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/fb";
var moment = require("moment");
import NewMessage from "./NewMessage";

export default {
  name: "chat",
  // props: ["name"],
  components: {
    NewMessage
  },
  data() {
    return {
      moment: moment,
      data: moment().format(" DD MMMM YYYY, h:mm:ss a"),
      message: "",
      messages: [],
      auth: null
    };
  },
  methods: {
    sendMsg() {
      db.database()
        .ref()
        .child("posts-test")
        .push({ user: this.auth, msg: this.message });
      this.message = "";
    },
    getPosts() {
      let that = this;
      db.database()
        .ref("posts-test/")
        .on("value", snapshot => {
          console.log(snapshot.val());

          that.messages = snapshot.val();
        });
    },

    googleLogin() {
      let that = this;
      const provider = new db.auth.GoogleAuthProvider();
      db.auth()
        .signInWithPopup(provider)
        .then(function(result) {
          console.log(result);

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = {
            name: result.user.displayName,
            email: result.user.email,
            avatar: result.user.photoURL,
            id: result.user.uid
          };
          console.log(user);
          that.auth = user;

          db.database()
            .ref("users/" + result.user.uid)
            .set(user);

          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
    logOut() {
      let that = this;
      db.auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          that.auth = null;
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  },
  created() {
    this.getPosts();
    db.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.auth = {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          id: user.uid
        };
      } else {
        // No user is signed in.
        console.log("User not logged in!!!");
      }
    });
  }
};
</script>

<style>
.chat {
  color: white !important;
}
.user2 {
  font-size: small;
}
.user1 {
  font-size: 20px;
}
.teal-text {
  text-align: center;
}
.logout1 {
  height: 20px !important;
  width: 20px !important;
  font-size: 10px !important;
}
.logout {
  display: flex !important;
  justify-content: flex-end !important;
}
</style>
