<template>
<div>
  <div class="sign_out">
    <span>Sign out</span>
  </div>
  <div class="col-md-6 col-md-offset-3 feed_wrapper">


    <p class="text-center" style="margin-bottom: 20px;">
      <i class="fa fa-eye fa-5x text-center"></i>
    </p>

    <!-- New Post -->
    <div class="new_post_wrapper clearfix">
      <form class="message" action="index.html" method="post">
        <textarea name="new_message" class="form-control" placeholder="Write a message..." id="new_message"></textarea>
        <input type="submit" name="" class="btn btn-primary post_btn" value="Publish">
        <span class="message_info">Character: 300</span>

      </form>
    </div>


    <!-- Posts feed -->
    <div class="message_post clearfix">
      <div class="message_box">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      <div class="message_info" style="line-height: 1px; padding-top: 20px;">
        <p>@Username <span>11-03-17</span></p>
      </div>
    </div>


  </div>
</div>
</template>

<script>
export default {
  name: 'feed',
  data () {
    return {}
  }
}
</script>
