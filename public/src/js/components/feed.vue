<template>
<div>

  <navbar></navbar>

  <div class="col-md-6 col-md-offset-3 feed_wrapper">

    <!-- Tags
     ============================================================ -->
     <div class="feed_tags">
      <span class="label label-primary">Oskar</span>
      <span class="label label-primary">Work</span>
      <span class="label label-primary">Context</span>
      <span class="label label-primary">Aware</span>
      <span class="label label-primary">Social media</span>
     </div>


    <!-- New Message
     ============================================================ -->
    <div class="new_post_wrapper clearfix">
      <form class="message" action="index.html" method="post">
        <textarea name="new_message" class="form-control" placeholder="Write a message..." rows="3" id="new_message"></textarea>
        <input type="submit" name="" class="btn btn-primary post_btn" value="Publish">
        <span class="message_info">Character: 300</span>

      </form>
    </div>


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


  </div>
</div>
</template>

<script>
import Navbar from './navbar.vue'
export default {
  name: 'feed',
  components: {
    navbar: Navbar
  },
  data () {
    return {}
  }
}
</script>
