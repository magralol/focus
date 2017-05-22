<template>
    <div>
        <div class="message_post clearfix">
          <div class="message_info">
              <a v-bind:href="'#/user/'+user">@{{ user }}</a>
              <span>{{ parseDate(date) }}</span>
          </div>
          <div class="message_box">
              <p><markdown :text="text"></markdown></p>
          </div>
        </div>
    </div>
</template>

<script>
import markdown from './markdown.vue'
import moment from 'moment'

export default {
  name: 'app',
  props: ['text', 'user', 'date'],
  components: {
    markdown: markdown
  },
  data () {
    return {}
  },
  methods: {
    parseDate: function(date){
      return moment(date).format('DD/MM-YYYY');
    }
  }
}
</script>
