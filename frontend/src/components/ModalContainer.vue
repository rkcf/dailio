<template>
  <diV id="modal-container" v-on:click="closeModal">
    <div id="modal-content" v-on:click.stop>
      <button id="close-modal" v-on:click="closeModal">
        <svg viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </button>
      <CreateTask/>
    </div>
  </div>
</template>

<script>
import CreateTask from './CreateTask'

export default {
  name: 'ModalContainer',
  components: {
    CreateTask
  },
  methods: {
    closeModal () {
      this.$store.commit('closeModal')
    }
  }
}
</script>

<style scoped>
#modal-container {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

#modal-content {
  background: #fff;
  width: 40%;
  padding: 1rem;
  margin: 10rem auto;
}

#close-modal {
  float: right;
  fill: #000;
  height: 1.5rem;
  width: 1.5rem;
}
</style>
