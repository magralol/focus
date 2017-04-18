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
      posts: [],
      postbody: ""
    }
  },
  mounted: function(){
    this.$store.dispatch('GET_POSTS').then((res) =>{
      console.log(res.data);
      this.posts = res.data;
    })
    .catch((err) => {
      if(err.response){
        //TODO: real errors:
        console.log(err);
      }
    });
  },
  methods: {
    parseDate: function(date){
      return moment(date).format('DD/MM-YYYY');
    },
    post: function(){
      this.$store.dispatch('CREATE_POST', {body: this.postbody}).then((res) =>{
        
        this.posts = res.data;
        this.postbody = "";
        this.$forceUpdate();
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
