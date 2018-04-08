<template>
<div v-if="task">
  <div id="modal-header">
    <h2>{{ task.task_name }}</h2>
    <button v-on:click="editName = true">edit</button>
  </div>
  <div v-show="editName">
    <form v-on:submit.prevent="changeTaskName(task.task_id, newName)">
      <input name="newName"
             v-model="newName"
             placeholder="New Task Name?"
      ><button class="btn">change</button>
    </form>
  </div>
  <div id="modal-body">
    <button class="delete-btn" v-on:click="confirmDelete = true">
      delete
    </button>
    <div v-show="confirmDelete">
      <p>Are you sure you want to delete {{ task.task_name }}?</p>
      <button class="btn" v-on:click="deleteTask(task.task_id)">Delete</button>
    </div>
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
      this.$store.commit('closeModal')
      this.$store.dispatch('deleteTask', id)
      this.confirmDelete = false
    },
    changeTaskName: function (id, newName) {
      this.$store.dispatch('changeTaskName', { id, newName })
      this.editName = false
    }
  }
}
</script>

<style scoped>
.delete-btn {
}
</style>
