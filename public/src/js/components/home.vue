<template>

  <div id="home-wrapper">
    <div class="login-box">
      <h3>Focus</h3>

      <!-- Register form -->
      <form v-show="!registerShow" class="register-form home-form" action="index.html" method="post">

        <!-- Username -->
        <label for="reg_username">Username</label>
        <input id="reg_username" type="text" name="" class="form-control" value="">

        <!-- Email -->
        <label for="reg_email">Email</label>
        <input id="reg_email" type="email" name="" class="form-control" value="">

        <!-- Password -->
        <label for="reg_password">Password</label>
        <input id="reg_password" type="password" name="" class="form-control" value="">

        <!-- Register button -->
        <input type="submit" name="reg_btn" class="reg_btn btn" value="Register">
        
        <!-- Info tooltip -->
        <span> Already have an account? <i v-on:click="registerShow = !registerShow">Sign in</i></span>
      </form>

      <!-- Sign in form -->
      <form v-show="registerShow" class="login-form home-form" action="index.html" method="post">

        <!-- Email -->
        <label for="login_email">Email</label>
        <input id="login_email" type="email" name="" class="form-control" value="">

        <!-- Password -->
        <label for="login_password">Password</label>
        <input id="login_password" type="password" name="" class="form-control" value="">

        <!-- Register button -->
        <input type="submit" name="login_btn" class="reg_btn btn" value="Sign in">

        <!-- Info tooltip -->
        <span> Dont have an account? <i v-on:click="registerShow = !registerShow">register!</i></span>
      </form>


    </div>
  </div>

</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      registerShow: true
    }
  }
}
</script>
