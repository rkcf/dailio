<template>
<div v-if="task">
  <ModalContainer v-on:close="close">
    <div id="modal-header">
      <h2>
        {{ task.task_name }}
        <button id="edit-btn" v-show="!editTask" v-on:click="editTask = true">edit</button>
        <button id="edit-btn" v-show="editTask" v-on:click="cancelEdit">cancel</button>
      </h2>
    </div>
    <div v-show="editTask">
      <form v-on:submit.prevent="validateTaskName(task.task_id, newName)">
          <input v-validate="'required|max:50'"
               placeholder="New Task Name?"
               v-model="newName"
               name="newName"
        ><button class="btn">Change</button>
        <transition name="fade">
          <div class="input-danger" v-show="errors.has('newName')">
            {{ errors.first('newName') }}
          </div>
        </transition>
      </form>
    <div id="modal-body">
      <button v-show="!confirmDelete" v-on:click="confirmDelete = true">
        delete
      </button>
      <div class="input-danger" v-show="confirmDelete">
        <p>Are you sure you want to delete {{ task.task_name }}?</p>
        <button class="btn" v-on:click="confirmDelete = false">Cancel</button>
        <button class="btn" v-on:click="deleteTask(task.task_id)">Delete</button>
      </div>
    </div>
    </div>
  </ModalContainer>
</div>
</template>

<script>
import ModalContainer from './ModalContainer'

export default {
  name: 'ModalTaskDetail',
  components: {
    ModalContainer
  },
  data: function () {
    return {
      confirmDelete: false,
      editTask: false,
      newName: ''
    }
  },
  computed: {
    task () {
      return this.$store.getters.getTaskById(this.$store.state.activeTaskId)
    }
  },
  methods: {
    deleteTask: function (id) {
      // delete the active task
      this.$store.commit('closeModal')
      this.$store.dispatch('deleteTask', id)
      this.confirmDelete = false
    },
    changeTaskName: function (id, newName) {
      // Change the name of the active task
      this.$store.dispatch('changeTaskName', { id, newName })
    },
    validateTaskName: function (id, newName) {
      // Check if new task name is valid before changing
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.changeTaskName(id, newName)
        }
      })
    },
    cancelEdit: function () {
      this.clearForm()
      this.editTask = false
    },
    clearForm: function () {
      this.newName = ''
      this.editTask = false
      this.confirmDelete = false
      this.$validator.reset()
    },
    close: function () {
      this.clearForm()
      this.$store.commit('closeModal')
    }
  }
}
</script>

<style scoped>
#edit-btn {
  color: #888;
}
</style>
