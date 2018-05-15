<template>
  <div id="main-menu" class="raised">
    <button v-on:click="openSettings">
      settings
    </button>
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
      this.$emit('closeMenu')
      this.$store.dispatch('logout')
    },
    openSettings () {
      this.$emit('closeMenu')
      this.$store.dispatch('openModal', 'settings')
    }
  }
}
</script>

<style scoped>
#main-menu {
  grid-column: 1 / 6;
  grid-row: 2;
  z-index: 10;
  background: #c9f6f4;
  padding: 1.5rem;
  position: relative;
  text-align: center;
}
</style>
