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
            <div class="col-xs-3 mobile-icon" v-bind:class="page == 'feed' ? 'mobile-active': ''">
              <i class="fa fa-commenting-o fa-2x"></i>
            </div>
          </a>

          <a :href="'#/user/'+user">
            <div class="col-xs-3 mobile-icon" v-bind:class="page == 'profile' ? 'mobile-active': ''">
              <i class="fa fa-user fa-2x"></i>
            </div>
          </a>

          <a href="#/settings">
            <div class="col-xs-3 mobile-icon" v-bind:class="page == 'settings' ? 'mobile-active': ''">
              <i class="fa fa-cog fa-2x"></i>
            </div>
          </a>

          <a href="#" v-on:click="signout">
            <div class="col-xs-3 mobile-icon">
              <i class="fa fa-times-circle-o fa-2x"></i>
            </div>
          </a>
         </span>

         <!-- <a href="" class="navbar-brand"><img src=""></a> -->
       </div>
       <div class="navbar-collapse collapse">
         <ul class="nav navbar-nav navbar-right">
           <li v-bind:class="page == 'feed' ? 'active': ''"><a href="#/feed">Flöde</a></li>
           <li v-bind:class="page == 'profile' ? 'active': ''"><a :href="'#/user/'+user">Profil</a></li>
           <li v-bind:class="page == 'settings' ? 'active': ''"><a href="#/settings">Inställningar</a></li>
           <li><a href="#" v-on:click="signout">Logga ut</a></li>
         </ul>
       </div>
     </div>

   </div>
</div>
</template>

<script>
export default {
  name: 'navbar',
  props: ['page'],
  data () {
    return {
      user: "null"
    }
  },
  beforeMount: function(){
    
    this.$store.dispatch('GET_USER_NAME').then((res) => {
      this.user = res.data.username;
    }).catch((err) => {
        if(err.response){
          //TODO: real errors:
          console.log(err);
        }
    });
  },
  methods:{
    signout: function(e){
      e.preventDefault();
      if(localStorage.getItem("token")){
        localStorage.removeItem("token");
      }
       window.location.href = "/"
    }
  }
}
</script>
