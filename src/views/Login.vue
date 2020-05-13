<template>
  <div class="chat">
    <h1 class="teal-text">Welcome</h1>

    <div class="welcome">
      <div class="card">
        <div class="card-content" center-align>
          <div v-if="!auth">
            <div class="loginLogo">
              <img
                src="https://www.stickpng.com/assets/images/5a951939c4ffc33e8c148af2.png"
                alt="Snow"
              />
              <v-btn
                class="login"
                @click="googleLogin"
                src="submit.gif"
                text-small
                color="primary"
              >Login</v-btn>
            </div>
          </div>
          <form>
            <div class="avatar">
              <p v-if="!auth">Login with google</p>
              <router-link to="/chat" v-if="auth">
                <h3>{{ auth.name }}</h3>
                <img :src="auth.avatar" alt="profile image" />

                <div class="my-1">
                  <v-btn color="error">Enter</v-btn>
                </div>
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/fb";
export default {
  name: "Welcome",
  data() {
    return {
      auth: null
    };
  },
  methods: {
    googleLogin() {
      let that = this;
      const provider = new db.auth.GoogleAuthProvider();
      db.auth()
        .signInWithPopup(provider)
        .then(function(result) {
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

    created() {
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
      }
    }
  }
};
</script>

<style scoped>
.avatar img {
  width: 50px;
  margin-top: 5px;
}
.avatar {
  display: flex;
  justify-content: center;
  text-align: center;
}
.v-application .my-1 {
  margin-top: 60px !important;
}
.loginLogo img {
  width: 35px;
}
.loginLogo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.teal-text {
  font-size: 60px !important;
  color: white;
  text-align: center !important;
  margin-top: 15% !important;
}
.card-content {
  margin-top: 2% !important;
}
</style>
