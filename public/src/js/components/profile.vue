<template>
<div>
  <navbar :page="'profile'"></navbar>
  <div class="profile_header">
    <h3 v-if="username">@{{ username }}</h3>
    <p class="text-center">Inlägg</p>
    <p class="text-center">{{posts.length}}</p>
  </div>

  <div class="col-md-6 col-md-offset-3 feed_wrapper">
    <!-- Message Feed
     ============================================================ -->
    <div v-for="post in posts">
      <feeditem :text="post.body" :user="post.user" :date="post.date"></feeditem>
    </div>

    <div v-if="posts.length == 0">
        Användaren har inte postat någonting.
    </div>

  </div>
</div>

</template>

<script>
import Navbar from './navbar.vue'
import markdown from './markdown.vue'
import Feeditem from './feeditem.vue'
import moment from 'moment'

export default {
  name: 'profile',
  components: {
    navbar: Navbar,
    feeditem: Feeditem,
    markdown: markdown
  },
  data () {
    return {
      username: null,
      socket: io()
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
   mounted: function(){
      this.socket.on('new post user ' + this.username, (data)=>{
        //Hacky way to not prevent posts from uppdating in diffrent components
        if(this.$route.path === "/user/"+ this.username) this.posts.unshift(data)
      });
   },
   methods:{
   }
}
</script>
