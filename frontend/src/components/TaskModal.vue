<template>
  <diV id="task-modal">
    <div id="modal-container">
      <h1>Modal Header</h1>
      <button v-on:click="$emit('closeModal')">close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskModal'
}
</script>

<style scoped>
#task-modal {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

#modal-container {
  background: #fff;
  width: 40%;
  text-align: center;
  padding: 1rem;
  vertical-align: center;
  height: 300px;
  margin: 10rem auto;
}
</style>
