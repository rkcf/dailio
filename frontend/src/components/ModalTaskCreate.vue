<template>
  <ModalContainer v-on:close="close">
    <div id="modal-header">
      <h2>create task</h2>
    </div>
    <div id="modal-body">
      <form v-on:submit.prevent="validateTaskName(taskName)">
        <input
          v-validate="'required|max:50'"
          placeholder="new task name?"
          v-model="taskName"
          name="taskName"
        ><button class="btn">create</button>
        <transition name="fade">
          <div class="input-danger" v-show="errors.has('taskName')">
            {{ errors.first('taskName') }}
          </div>
        </transition>
      </form>
    </div>
  </ModalContainer>
</template>

<script>
import ModalContainer from './ModalContainer'

export default {
  name: 'CreateTask',
  components: {
    ModalContainer
  },
  data () {
    return {
      taskName: ''
    }
  },
  methods: {
    validateTaskName: function (taskName) {
      // Check if the task name is valid before creating
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch('addTask', taskName)
          this.clearForm()
        }
      })
    },
    clearForm: function () {
      // Clear out the form and reset the validator
      this.taskName = ''
      this.$validator.reset()
    },
    close: function () {
      // Close out the modal
      this.clearForm()
      this.$store.commit('closeModal')
    }
  }
}
</script>

<style scoped>
</style>
