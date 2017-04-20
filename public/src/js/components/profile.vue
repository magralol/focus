<template>
<div>
  <navbar></navbar>
  <h3 style="margin: 30px auto;" class="text-center" v-if="username">@{{ username }}</h3>

  <div class="col-md-4 col-md-offset-4 feed_wrapper">
    <!-- Message Feed
     ============================================================ -->
    <div class="message_post clearfix" v-for="post in posts">
      <div class="message_box">
        <p><markdown :text="post.body"></markdown></p>
      </div>
      <div class="message_info" style="line-height: 1px; padding-top: 20px;">
        <p><a href="#">@{{ post.user}}</a> <span>1{{ parseDate(post.date) }}</span></p>
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
  name: 'profile',
  components: {
    navbar: Navbar,
    markdown: markdown
  },
  data () {
    return {
      username: null
    }
  },
  computed: {
    posts: function () {
      return this.$store.state.posts;
    }
  },
  beforeMount: function(){
    this.username = this.$route.params.username;
    this.$store.dispatch('GET_USER', {username: this.username}).then((res) => {
        this.$store.commit('setposts', res.data.posts);
      })
      .catch((err) => {
        //TODO: Real error handling
        console.log(err);
      });
   },
   methods:{
     parseDate: function(date){
        return moment(date).format('DD/MM-YYYY');
     }
   }
}
</script>
