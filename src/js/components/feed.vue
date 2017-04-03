<template>
<div>
  <div class="sign_out" v-on:click="signout()">
    <span>Sign out</span>
  </div>
  <div class="col-md-4 col-md-offset-4 feed_wrapper">



    <!-- New Post -->
    <div class="new_post_wrapper clearfix">
      <form class="message" v-on:submit.prevent="createPost()">
        <textarea class="form-control" placeholder="Write a message..." id="new_message" v-model="postbody"></textarea>
        <input type="submit" class="btn btn-primary post_btn" value="Publish">
        <span class="message_info">Character: {{postbody.length}}/300</span>

      </form>
    </div>


    <!-- Posts feed -->
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
