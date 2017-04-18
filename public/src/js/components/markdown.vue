<template>
    <div v-html="markdown"></div>
</template>

<script>
export default {
  name: 'markdown',
  props: ['text'],
  data () {
    return {
        markdown: ""
    }
  },
  mounted: function(){
      this.markdown = new showdown.Converter().makeHtml(this.text);
  }
}
</script>