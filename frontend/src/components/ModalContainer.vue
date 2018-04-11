<template>
  <div id="modal-container" v-on:click="closeModal">
    <div id="modal-content" v-on:click.stop>
      <button id="close-modal" v-on:click="closeModal">
        <svg viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalContainer',
  methods: {
    closeModal () {
      this.$emit('close')
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
  position: relative;
  background: #fff;
  width: 40%;
  padding: 1rem;
  margin: 10rem auto;
}

#close-modal {
  position: absolute;
  right: 1rem;
  top: 1rem;
  height: 2.5rem;
  width: 2.5rem;
}

#modal-header h2{
  margin-top: 0;
}
</style>
