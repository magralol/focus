<template>
<div>

  <navbar :page="'feed'"></navbar>
  <div class="active-filters-bar">
    <p>Filter: <span>WORK</span> </p>
  </div>
  <h3 style="margin: 30px auto;" class="text-center" v-if="tagname">#{{ tagname }}</h3>

  <div class="col-md-6 col-md-offset-3 feed_wrapper">

    <!-- New Message
     ============================================================ -->
    <div class="new_post_wrapper clearfix">
      <form class="message" v-on:submit.prevent="post">
        <textarea name="new_message" class="form-control" placeholder="Skriv ett meddelande..." rows="6" id="new_message" v-model="postbody"></textarea>
        <p class="char_count">Tecken: {{postbody.length}}/300</p>
        <input type="submit" name="" class="btn btn-primary reg_btn" value="Skicka">
      </form>
    </div>

    <!-- Message Feed
     ============================================================ -->
    <div v-if="posts.length == 0">
      <span v-if="tagname">Det finns inga inlägg i #{{tagname}}</span>
      <span v-else>Det finns för tillfället inga inlägg.</span>
    </div>

    <div v-for="post in posts">
      <feeditem :text="post.body" :user="post.user" :date="post.date"></feeditem>
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
  name: 'feed',
  components: {
    navbar: Navbar,
    markdown: markdown,
    feeditem: Feeditem
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

        if(this.$route.params.tag){
          this.posts.unshift({body: res.data[0].body, user: res.data[0].user, date: res.data[0].date});
        }else{
          this.$store.commit('setposts', res.data);
        }
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
