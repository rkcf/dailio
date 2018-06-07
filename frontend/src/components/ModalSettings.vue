<template>
  <ModalContainer v-on:close="close">
    <div id="modal-header">
      <h2>settings</h2>
    </div>
    <div id="modal-body">
      <span>
        <input type="checkbox" id="vacationCheck" v-model="vacationState">
        <label for="vacationCheck">Vacation Mode</label>
      </span>
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
  mounted () {
    // Dispatch request to get account settings from API
    this.$store.dispatch('getAccountSettings')
  },
  computed: {
    vacationState: {
      get () {
        return this.$store.getters.vacationState
      },
      set () {
        this.$store.dispatch('toggleVacationState')
      }
    }
  },
  methods: {
    close () {
      // Close out the modal
      this.$store.commit('closeModal')
    }
  }
}
</script>

<style scoped>
</style>
