<template>

  <div id="home-wrapper">
    <div class="login-box">
      <h3>Focus</h3>

      <div v-show="successmsg" class="alert alert-success" role="alert"><b>{{ successmsg }}</b></div>

      <div v-show="errors" class="alert alert-danger" role="alert">
        <b>{{ errors }}</b>
      </div>

      <!-- Register form -->
      <form v-show="!registerShow" class="register-form home-form" v-on:submit.prevent="register">

        <!-- Username -->
        <label for="reg_username">Användarnamn</label>
        <input id="reg_username" type="text" name="" class="form-control homescreen-form" v-model="regUsername">

        <!-- Email -->
        <label for="reg_email">Email</label>
        <input id="reg_email" type="email" name="" class="form-control homescreen-form" v-model="regEmail">

        <!-- Password -->
        <label for="reg_password">Lösenord</label>
        <input id="reg_password" type="password" name="" class="form-control homescreen-form" v-model="regPassword">

        <!-- Register button -->
        <input type="submit" name="reg_btn" class="reg_btn btn" value="Registrera">

        <!-- Info tooltip -->
        <span>Har du redan ett konto? <i v-on:click="registerShow = !registerShow">Logga in</i></span>
      </form>

      <!-- Sign in form -->
      <form v-show="registerShow" class="login-form home-form" v-on:submit.prevent="signIn">

        <!-- Email -->
        <label for="login_email">Email</label>
        <input id="login_email" type="email" class="form-control homescreen-form" v-model="email">

        <!-- Password -->
        <label for="login_password">Lösenord</label>
        <input id="login_password" type="password" class="form-control homescreen-form" v-model="password">

        <!-- Register button -->
        <input type="submit" name="login_btn" class="reg_btn btn" value="Logga in">

        <!-- Info tooltip -->
        <span> Har du inget konto? <i v-on:click="registerShow = !registerShow">Registrera!</i></span>
      </form>


    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data() {
    return {
      registerShow: true,
      email: null,
      password: null,
      regEmail: null,
      regPassword: null,
      regUsername: null,
      errors: null,
      successmsg: null,
      signInStatus: false
    }
  },
  beforeMount: function(){
    if(localStorage.getItem("token")){
      this.$router.push({path:"/feed"});
    }
  },
  watch: {
    signInStatus: function(){
      console.log();
      console.log("signin status changed");
      if(this.signInStatus){
        console.log("test");
        //this.router.push({path:"/feed"});
      }
    }
  },
  methods: {
    signIn: function(){

      axios.post('/signin', {email: this.email, password: this.password}).then((res) => {
        localStorage.setItem("token", res.data);
        this.signInStatus = true;
      }).catch((err) => {
        if(err.response){
          //TODO: real errors:
          this.errors = "Fel användarnamn eller lösenord, försök igen!";
        }
      });
    },
    register: function(){
      this.$store.dispatch('REGISTER', {email: this.regEmail, password: this.regPassword, username: this.regUsername})
      .then((res) => {
        if(res){
          this.successmsg = 'Kontot skapat!';
          this.regEmail = null;
          this.regPassword = null;
          this.regUsername = null;
        }else{
          this.errors = "Nu har det visst blivit fel. Försök igen!";
        }
      }).catch((err) => {
        if(err.response){
          //TODO: real errors:
          this.errors = "Nu har det visst blivit fel. Försök igen!";
        }
      });
    }
  }
}
</script>
