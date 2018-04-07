<template>
  <diV id="modal-container" v-on:click="closeModal">
    <div id="modal-content" v-on:click.stop>
      <button id="close-modal" v-on:click="closeModal">
        <svg viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </button>
      <ModalTaskCreate v-show="$store.state.modalModule === 'create'"/>
      <ModalTaskDetail v-bind:task="task" v-show="$store.state.modalModule === 'detail'"/>
    </div>
  </div>
</template>

<script>
import ModalTaskCreate from './ModalTaskCreate'
import ModalTaskDetail from './ModalTaskDetail'

export default {
  name: 'ModalContainer',
  components: {
    ModalTaskCreate,
    ModalTaskDetail
  },
  props: ['task'],
  methods: {
    closeModal () {
      this.$store.commit('closeModal')
    }
  }
}
</script>

<style>
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

#modal-header {
  margin-bottom: 1rem;
}

#modal-body {
}

#close-modal {
  float: right;
  fill: #000;
  height: 1.5rem;
  width: 1.5rem;
}
</style>
