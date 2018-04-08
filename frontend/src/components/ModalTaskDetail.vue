<template>
<div v-if="task">
  <div style="display: inline-block;" id="modal-header">
    <h2>
      {{ task.task_name }} <button id="edit-btn" v-on:click="editName = true">edit</button>
    </h2>
  </div>
  <div v-show="editName">
    <form v-on:submit.prevent="changeTaskName(task.task_id, newName)">
      <input name="newName"
             v-model="newName"
             placeholder="New Task Name?"
      ><button class="btn">change</button>
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
    }
  }
}
</script>

<style scoped>
#edit-btn {
  color: #888;
}
</style>
