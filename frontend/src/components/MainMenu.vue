<template>
  <div id="main-menu">
    <button v-on:click="logout">
      logout
    </button>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
#main-menu {
  position: absolute;
  right: 2.5rem;
  top: 5rem;
  background: #f5f5f5;
  padding: 1.5rem;
}
</style>
