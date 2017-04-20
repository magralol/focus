<template>
<div>

  <navbar></navbar>
  <h3 style="margin: 30px auto;" class="text-center" v-if="tagname">#{{ tagname }}</h3>

  <div class="col-md-6 col-md-offset-3 feed_wrapper">

    <!-- New Message
     ============================================================ -->
    <div class="new_post_wrapper clearfix">
      <form class="message" v-on:submit.prevent="post">
        <textarea name="new_message" class="form-control" placeholder="Write a message..." rows="3" id="new_message" v-model="postbody"></textarea>
        <input type="submit" name="" class="btn btn-primary post_btn" value="Publish">
        <span class="message_info">Character: {{postbody.length}}/300</span>

      </form>
    </div>

    <!-- Message Feed
     ============================================================ -->
    <div class="message_post clearfix" v-for="post in posts">
      <div class="message_box">
        <p><markdown :text="post.body"></markdown></p>
      </div>
      <div class="message_info" style="line-height: 1px; padding-top: 20px;">
        <p><a v-bind:href="'#/user/'+post.user">@{{ post.user }}</a> <span>{{ parseDate(post.date) }}</span></p>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import Navbar from './navbar.vue'
import markdown from './markdown.vue'
import moment from 'moment'

export default {
  name: 'feed',
  components: {
    navbar: Navbar,
    markdown: markdown
  },
  data () {
    return {
      postbody: "",
      tagname: null
    }
  },
  computed: {
    posts: function () {
      return this.$store.state.posts;
    }
  },
  watch: {
    posts: function(){
      //console.log("posts changed!");
      //this.posts = this.$store.state.posts;
      //console.log(this.posts[0]);
      //this.$set("posts", this.$store.state.posts);
      //console.log(this.$set);
      //this.$set(this.posts, this.$store.state.posts)
      //location.reload(); 
    }
  },
  beforeMount: function(){
    if(this.$route.params.tag){
      this.tagname = this.$route.params.tag;
      this.$store.dispatch('GET_POSTS_BY_TAG', {tag: this.$route.params.tag});
    }else{
      this.$store.dispatch('GET_POSTS');
    }
  },
  methods: {
    parseDate: function(date){
      return moment(date).format('DD/MM-YYYY');
    },
    post: function(){
      this.$store.dispatch('CREATE_POST', {body: this.postbody}).then((res) =>{
        
        this.$store.commit('setposts', res.data);
        //this.posts.unshift({body: res.data[0].body, user: res.data[0].user, date: res.data[0].date});
        this.postbody = "";
      })
      .catch((err) => {
        if(err.response){
          //TODO: real errors:
          console.log(err);
        }
      });
    }
  }
}
</script>
