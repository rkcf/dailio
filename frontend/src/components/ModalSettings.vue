<template>
  <ModalContainer v-on:close="close">
    <div id="modal-header">
      <h2>settings</h2>
    </div>
    <div id="modal-body">
    </div>
  </ModalContainer>
</template>

<script>
import ModalContainer from './ModalContainer'

export default {
  name: 'ModalSettings',
  components: {
    ModalContainer
  },
  methods: {
    close: function () {
      // Close out the modal
      this.$store.commit('closeModal')
    }
  }
}
</script>

<style scoped>
</style>
