<template>
<div>
  <!-- Active filter bar
   ============================================================ -->

  <!-- <div class="filter-active-bar">
    <p><span>Work</span><i class="fa fa-circle" style="color: green;"></i></p>
  </div> -->

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
           <li class=""><a href="#/feed">Feed</a></li>
           <li class=""><a href="#/profile">Profile</a></li>
           <li class="active"><a href="#/settings">Settings</a></li>
           <li class=""><a href="/">Sign out</a></li>
         </ul>
       </div>
     </div>

   </div>
</div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {}
  }
}
</script>
