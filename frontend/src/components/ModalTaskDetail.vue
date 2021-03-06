<template>
  <ModalContainer v-on:close="close">
    <div id="modal-header">
      <h2>
        {{ task.task_name }}
        <button
          id="edit-btn"
          text="edit"
          v-show="!editTask"
          v-on:click="showEdit">
          edit
        </button>
        <button
          id="edit-btn"
          text="cancel"
          v-show="editTask"
          v-on:click="cancelEdit">
          cancel
        </button>
      </h2>
    </div>
    <div id="task-detail" v-show="!editTask">
      <h4>Current Streak: {{ task.task_streak }}</h4>
      <h4>Max Streak: {{ task.task_maxstreak }}</h4>
      <h4>Last Completed: {{ lastCompleted }}</h4>
    </div>
    <div id="edit-task" v-show="editTask">
      <form v-on:submit.prevent="validateTaskName(task.task_id, taskName)">
          <input
            v-validate="'required|max:50'"
            placeholder="new task name?"
            v-model="taskName"
            name="taskName"
        ><button class="btn">change</button>
        <transition name="fade">
          <div class="input-danger" v-show="errors.has('taskName')">
            {{ errors.first('taskName') }}
          </div>
        </transition>
      </form>
    <div id="modal-body">
      <button v-show="!confirmDelete" v-on:click="confirmDelete = true">
        delete
      </button>
      <div class="input-danger" v-show="confirmDelete">
        <p>Are you sure you want to delete {{ task.task_name }}?</p>
        <button class="btn" v-on:click="confirmDelete = false">cancel</button>
        <button id="delete-btn" class="btn" v-on:click="deleteTask(task.task_id)">delete</button>
      </div>
    </div>
    </div>
  </ModalContainer>
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
      taskName: ''
    }
  },
  computed: {
    task () {
      // get the task for detail view using the activeTaskId state
      return this.$store.getters.getTaskById(this.$store.getters.getActiveTaskId)
    },
    lastCompleted () {
      // return last date the task was completed on
      if (this.task.completion_dates.length === 0) {
        return 'Never'
      } else {
        return this.task.completion_dates[this.task.completion_dates.length - 1]
      }
    }
  },
  methods: {
    deleteTask: function (id) {
      // delete the active task
      this.confirmDelete = false
      this.$store.commit('closeModal')
      this.$store.dispatch('deleteTask', id)
    },
    changeTaskName: function (id, taskName) {
      // Change the name of the active task
      this.$store.dispatch('changeTaskName', { id, taskName })
      this.clearForm()
    },
    validateTaskName: function (id, taskName) {
      // Check if new task name is valid before changing
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.changeTaskName(id, taskName)
        }
      })
    },
    showEdit: function () {
      // Open editing view
      this.editTask = true
    },
    cancelEdit: function () {
      // Reset form and close editing view
      this.clearForm()
      this.editTask = false
    },
    clearForm: function () {
      // Clear out the form paramaters and reset the validator
      this.taskName = ''
      this.editTask = false
      this.confirmDelete = false
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
#edit-btn {
  color: #888;
  font-size: 1.1rem;
  font-weight: 400;
}
</style>
