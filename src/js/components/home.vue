<template>
  <div>
    <h1>Home view!</h1>

    <p>count: {{ count }}</p>

    <button v-on:click="inc()">click me!</button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data: function() {
    return {}
  },
  computed: {
    count: function() {
        return this.$store.state.count;
    }
  },
  methods: {
    inc: function(e){
      this.$store.dispatch('increment')
    }
  }
}
</script>
