<template>
  <div class="container-fluid">
    <!-- <v-row justify="center">
      <v-dialog v-model="dialog" width="280px">
        <template v-slot:activator="{ on }">
          <v-btn class="onlineUser" color="green" dark v-on="on">Online</v-btn>
        </template>

        <v-card>
          <v-card-title>
            <span class="headline">Users on-line</span>
          </v-card-title>

          <ul class="userOnline" v-if="auth">
            <img class="onlineImg" :src="auth.avatar" alt="profile image" />

            <span class="online">{{ auth.name }}:</span>
          </ul>

          <v-card-actions>
            <v-btn color="green darken-1" text @click="dialog = false">
              <span class="ok">Ok</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>-->
    <!-- {{ moment(newDate).fromNow() }}. -->
    <!-- {{ moment(newDate).format("DD MMMM YYYY, h:mm:ss a") }} -->
    <!-- {{ moment("h:mm:ss a").fromNow() }} -->

    <ul v-chat-scroll>
      <div class="message" v-for="(v, k, i) in messages" :key="i + 'msg'">
        <p v-if="auth">
          <span v-if="v.user.id == auth.id" class="chat1">
            <div>
              <v-card class="chat1Card">
                <div class="sms">
                  <img :src="v.user.avatar" alt="avatar" />
                  {{ v.user.name }}
                  : {{ v.msg }}
                  <br />

                  <!-- <i>Last seen&nbsp; {{ moment(v.time).fromNow() }}</i> -->
                  <i>Last seen&nbsp; {{ moment(v.time).fromNow() }}</i>
                </div>
              </v-card>
            </div>
          </span>

          <span v-else class="chat2">
            <div>
              <v-card class="chat2Card">
                <div class="sms">
                  <img :src="v.user.avatar" alt="avatar" />
                  <!-- {{ moment(v.newDate).format("DD MMMM YYYY, h:mm:ss a") }} -->
                  {{ v.user.name }}
                  : {{ v.msg }}
                  <br />
                  <!-- <div class="seen"> -->
                  <i>Last seen&nbsp; {{ moment(v.time).fromNow() }}</i>
                </div>
              </v-card>
            </div>
          </span>
        </p>
      </div>
    </ul>
    <div class="new-message">
      <input
        class="input"
        hide-details="auto"
        type="text"
        placeholder="Message"
        v-model="message"
      />
      <v-btn
        v-if="message != ''"
        @click="sendMsg"
        class="send"
        tile
        large
        color="blue"
        icon
      >
        <v-icon>mdi mdi-send</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
var moment = require("moment");
import db from "@/fb";
import Vue from "vue";
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);

export default {
  name: "NewMessage",
  data() {
    return {
      moment: moment,
      dialog: false,
      message: "",
      messages: [],
      auth: null,
      data: moment().format(" DD MMMM YYYY, h:mm:ss a"),
      ahora: moment().fromNow()
    };
  },

  methods: {
    sendMsg() {
      let newDate = new Date().toString();
      db.database()
        .ref()
        .child("posts-test")
        .push({ user: this.auth, msg: this.message, time: newDate });
      this.message = "";
      // console.log(newDate);
    },
    getPosts() {
      let that = this;
      db.database()
        .ref("posts-test/")
        .on("value", snapshot => {
          // console.log(snapshot.val());
          that.messages = snapshot.val();
          // console.log(this.messages);
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

        console.log(this.auth);
      } else {
        // No user is signed in.
        console.log("User not logged in!!!");
      }
    });
  }
};
</script>

<style>
.v-application .ma-2 {
  margin: 0px !important;
}
.sms i {
  color: red;
}
.sms {
  margin: 5px;
  text-align: left;
  font-size: small;
  padding: 10px;
}
.sms img {
  width: 15px;
}
.chat1Card {
  background-color: pink !important;

  padding-bottom: 2px !important;
  margin-left: auto !important;
  border-radius: 10px;
  width: max-content;
  height: max-content;
  max-width: 335px;
}
.chat2Card {
  background-color: #c6f4c6 !important;

  padding-bottom: 2px !important;
  border-radius: 10px;
  width: max-content;
  height: max-content;
  max-width: 335px;
}

.sms i {
  font-size: 10px;
}
.new-message input {
  margin-left: 11px;
  text-align: center;
}
.new-message {
  display: flex;
  justify-content: center;
  height: 0px;
  align-items: center;
}
ul {
  height: 27em;
  overflow-y: scroll;
  list-style: none;
  padding: 1em;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
