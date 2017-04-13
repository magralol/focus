<template>
<div>
  <div class="filter-active-bar">
    <p><span>Work</span><i class="fa fa-circle" style="color: green;"></i></p>
  </div>
  <!-- Navigation bar
   ============================================================ -->
   <div class="navbar navbar-inverse navigation-bar" role="navigation">

     <div class="container">
       <div class="navbar-header text-center">
         <span class="visible-xs">
          <a href="#/feed">
            <div class="col-xs-3 mobile-icon">
              <i class="fa fa-commenting-o fa-2x"></i>
            </div>
          </a>

          <a href="#/profile">
            <div class="col-xs-3 mobile-icon mobile-active">
              <i class="fa fa-user fa-2x"></i>
            </div>
          </a>

          <a href="#/settings">
            <div class="col-xs-3 mobile-icon">
              <i class="fa fa-cog fa-2x"></i>
            </div>
          </a>

          <a href="#">
            <div class="col-xs-3 mobile-icon">
              <i class="fa fa-times-circle-o fa-2x"></i>
            </div>
          </a>
         </span>

         <!-- <a href="" class="navbar-brand"><img src=""></a> -->
       </div>
       <div class="navbar-collapse collapse">
         <ul class="nav navbar-nav navbar-right">
           <li class="active"><a href="blog.html">Sign out</a></li>
         </ul>
       </div>
     </div>

   </div>

  <h3 style="margin: 30px auto;" class="text-center">@Username</h3>

  <div class="col-md-6 col-md-offset-3 feed_wrapper">
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
export default {
  name: 'profile',
  data () {
    return {}
  }
}
</script>
