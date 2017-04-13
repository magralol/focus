<template>
<div>
  <navbar></navbar>
  <h3 style="margin: 30px auto;" class="text-center">@Username</h3>

  <div class="col-md-4 col-md-offset-4 feed_wrapper">
    <!-- Message Feed
     ============================================================ -->
    <div class="message_post clearfix">
      <div class="message_box">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      <div class="message_info" style="line-height: 1px; padding-top: 20px;">
        <p><a href="#">@Username</a> <span>11-03-17</span></p>
      </div>
    </div>

    <div class="message_post clearfix">
      <div class="message_box">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      <div class="message_info" style="line-height: 1px; padding-top: 20px;">
        <p><a href="#">@Username</a> <span>11-03-17</span></p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Navbar from './navbar.vue'
export default {
  name: 'profile',
  components: {
    navbar: Navbar
  },
  data () {
    return {}
  }
}
</script>
