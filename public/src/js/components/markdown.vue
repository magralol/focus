<template>
    <div class="markdown" v-html="markdown"></div>
</template>

<script>
export default {
  name: 'markdown',
  props: ['text'],
  cache: false,
  data () {
    return {
    }
  },
  computed: {
    markdown: {
        cache: false,
        get: function () {
            return new showdown.Converter().makeHtml(this.text);
        }
    }
  }/*
  mounted: function(){
      this.markdown = new showdown.Converter().makeHtml(this.text);
  }*/
}
</script>
