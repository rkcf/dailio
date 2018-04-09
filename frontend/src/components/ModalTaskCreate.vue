<template>
  <div>
    <ModalContainer>
      <div id="modal-header">
        <h2>Create Task</h2>
      </div>
      <div id="modal-body">
        <form v-on:submit.prevent="validateTaskname(taskname)">
          <input v-validate="'required|max:50'"
                 placeholder="Task Name"
                 v-model="taskname"
                 name="taskname"
          ><button class="btn">Create</button>
          <transition name="fade">
            <div class="input-danger" v-show="errors.has('taskname')">
              {{ errors.first('taskname') }}
            </div>
          </transition>
        </form>
      </div>
    </ModalContainer>
  </div>
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
      taskname: ''
    }
  },
  methods: {
    validateTaskname: function (taskname) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch('addTask', taskname)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
