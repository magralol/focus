<template>

  <div id="home-wrapper">
    <div class="login-box">
      <h3>Focus</h3>

      <!-- Register form -->
      <form v-if="!registerShow" class="register-form home-form" v-on:submit.prevent="register()">

        <!-- Username -->
        <label for="reg_username">Username</label>
        <input id="reg_username" type="text" class="form-control" v-model="regUsername">

        <!-- Email -->
        <label for="reg_email">Email</label>
        <input id="reg_email" type="email" class="form-control" v-model="regEmail">

        <!-- Password -->
        <label for="reg_password">Password</label>
        <input id="reg_password" type="password" class="form-control" v-model="regPassword">

        <!-- Register button -->
        <input type="submit" class="reg_btn btn" value="Register">
        <span> Already have an account? <i id="userbtn" v-on:click="registerShow = !registerShow">Sign in</i></span>
      </form>

      <!-- Sign in form -->
      <form v-if="registerShow" class="login-form home-form" v-on:submit.prevent="signin()">

        <!-- Email -->
        <label for="login_email">Email</label>
        <input id="login_email" type="email" class="form-control"  v-model="email">

        <!-- Password -->
        <label for="login_password">Password</label>
        <input id="login_password" type="password" class="form-control" v-model="password">

        <!-- Register button -->
        <input type="submit" class="reg_btn btn" value="Sign in">
        <span> Register for a <i id="userbtn" v-on:click="registerShow = !registerShow">account!</i></span>
      </form>

      <!-- Info tooltip -->

      <!--<button v-on:click="signout()"> loggout </button>-->
    </div>
  </div>

</template>

<script>
export default {
  name: 'home',
  data: function() {
    return {
      registerShow: true,
      email: null,
      password: null,
      regUsername: null,
      regEmail: null,
      regPassword: null
    }
  },
  computed: {
    user: function() {
        return this.$store.state.user;
    }
  },
  watch: {
      user: function(){
         console.log("user changed ", this.user);
         this.regEmail = null;
         this.regPassword = null;
         this.regUsername = null;
         this.$router.push('feed');
     } 
  },
  methods: {
    register: function(e){
      this.$store.dispatch('registerUser', {email: this.regEmail, password: this.regPassword, username: this.regUsername});
    },
    signout: function(e){
      this.$store.dispatch('signOutUser');
    },
    signin: function(e){
      this.$store.dispatch('signInUser', {email: this.email, password: this.password});
    }
  }
}
</script>

<style>
  #userbtn{
    cursor: pointer; 
  }
</style>
