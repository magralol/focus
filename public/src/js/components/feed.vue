<template>
<div>

  <!-- Navigation bar
   ============================================================ -->
   <div class="navbar navbar-inverse navbar-fixed-top navigation-bar" role="navigation">

     <div class="container">
       <div class="navbar-header">
         <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
           <span class="sr-only">Menu</span>
           <span class="icon-bar"></span>
           <span class="icon-bar"></span>
           <span class="icon-bar"></span>
         </button>
         <!-- <a href="" class="navbar-brand"><img src=""></a> -->
       </div>
       <div class="navbar-collapse collapse">
         <ul class="nav navbar-nav navbar-right">
           <li class="active"><a href="blog.html">Sign out</a></li>
         </ul>
       </div>
     </div>

   </div>

  <div class="col-md-6 col-md-offset-3 feed_wrapper">


    <!-- Logo
     ============================================================ -->
    <p class="text-center" style="margin-bottom: 20px;">
      <i class="fa fa-eye fa-5x text-center"></i>
    </p>

    <!-- New Message
     ============================================================ -->
    <div class="new_post_wrapper clearfix">
      <form class="message" v-on:submit.prevent="createPost()">
        <textarea class="form-control" placeholder="Write a message..." id="new_message" v-model="postbody"></textarea>
        <input type="submit" class="btn btn-primary post_btn" value="Publish">
        <span class="message_info">Character: {{postbody.length}}/300</span>

      </form>
    </div>

    <!-- Message Feed
     ============================================================ -->
    <div class="message_post clearfix" v-for="post in posts">
      <div class="message_box">
        <p>{{ post.body }}</p>
      </div>
      <div class="message_info" style="line-height: 1px; padding-top: 20px;">
        <p>@{{ post.user }} <span>{{ parseDate(post.date) }}</span></p>
      </div>
    </div>


  </div>
</div>
</template>

<script>
export default {
  name: 'feed',
  data () {
    return {
      postbody: "",
      user: null,
      posts: []
    }
  },
  computed: {
    posts: function() {
        return this.$store.state.posts;
    }
  },
  watch: {
      posts: function(){
         this.postbody = "";
     } 
  },
  methods: {
    signout: function(e){
      this.$store.dispatch('signOutUser');
      this.$router.push({ name: 'home'});
    },
    createPost: function(e){
      this.$store.dispatch('createPost', {user: this.user.displayName, body: this.postbody});
    },
    parseDate: function(date){
      //TODO: FIX THIS with MOMENT.js
      console.log("date;", date);
      var d = new Date(date);

      return d.getDay() + "-" + d.getMonth()+1 + "-" + d.getYear();
    }
  },
  mounted: function(){
    this.user = this.$store.state.user;
    firebase.database().ref('posts').once('value').then((data) => {
        let p = [];
        var postdata = data.val(); 
        for(var post in data.val()){
          p.push({user: postdata[post].user, body: postdata[post].body, date: postdata[post].date});
        }
        this.posts = p;
      }); 
  }
}
</script>
