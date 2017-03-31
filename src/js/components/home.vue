<template>
  <div>
    <h1>Home view!</h1>

    <p>{{this.user}}</p>

    <p>sign in</p>
    <form v-on:submit.prevent="signin()">
      <input type="email" placeholder="email" v-model="email">
      <input type="password" placeholder="password" v-model="password">
      <input type="submit" value="sign in">
    </form>

    <br><br>
    <p>register</p>
    <form v-on:submit.prevent="register()">
      <input type="text" placeholder="username" v-model="regUsername">
      <input type="email" placeholder="email" v-model="regEmail">
      <input type="password" placeholder="password" v-model="regPassword">
      <input type="submit" value="register">
    </form>
    
    <button v-on:click="signout()"> loggout </button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data: function() {
    return {
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
