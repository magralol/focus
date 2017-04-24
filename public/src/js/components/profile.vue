<template>
<div>
  <navbar :page="'profile'"></navbar>
  <h3 style="margin: 30px auto;" class="text-center" v-if="username">@{{ username }}</h3>

  <div class="col-md-4 col-md-offset-4 feed_wrapper">
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
