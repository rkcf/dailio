<template>
  <diV id="modal-container">
    <div id="modal-content">
      <h1>Modal Header</h1>
      <button v-on:click="$emit('closeModal')">close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalContainer'
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
  height: 300px;
  margin: 10rem auto;
}
</style>
