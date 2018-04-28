<template>
  <div id="main-menu">
    <button id="logout-btn" v-on:click="logout">
      logout
    </button>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  methods: {
    logout () {
      this.$emit('closeMenu')
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
#main-menu {
  grid-column: 5;
  grid-row: 2;
  background: #dcf4f3;
  padding: 1.5rem;
  position: relative;
  text-align: center;
  margin-left: 1.5rem;
}
</style>
