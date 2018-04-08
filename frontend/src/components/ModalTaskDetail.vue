<template>
<div v-if="task">
  <div id="modal-header">
    <h2>
      {{ task.task_name }} <button id="edit-btn" v-on:click="editName = true">edit</button>
    </h2>
  </div>
  <div v-show="editName">
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
    <button class="delete-btn" v-on:click="confirmDelete = true">
      delete
    </button>
    <div v-show="confirmDelete">
      <p>Are you sure you want to delete {{ task.task_name }}?</p>
      <button class="btn" v-on:click="deleteTask(task.task_id)">Delete</button>
    </div>
  </div>
  <div id="modal-body">
  </div>
</div>
</template>

<script>
export default {
  name: 'ModalTaskDetail',
  data: function () {
    return {
      confirmDelete: false,
      editName: false,
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
      this.editName = false
    },
    validateTaskName: function (id, newName) {
      // Check if new task name is valid before changing
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.changeTaskName(id, newName)
        }
      })
    }
  }
}
</script>

<style scoped>
#edit-btn {
  color: #888;
}
</style>
