<template>
  <div>
    <h2>{{ task.task_name }}</h2>
    <button class="delete-btn" v-on:click="confirmDelete = true">
      delete
    </button>
    <div v-show="confirmDelete">
      <p>Are you sure you want to delete {{ task.task_name }}?</p>
      <button class="btn" v-on:click="deleteTask(task.task_id)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalTaskDetail',
  data: function () {
    return {
      confirmDelete: false
    }
  },
  computed: {
    task () {
      return this.$store.state.activeTask
    }
  },
  methods: {
    deleteTask: function (id) {
      this.$store.dispatch('deleteTask', id)
      this.$store.commit('closeModal')
      this.confirmDelete = false
    }
  }
}
</script>

<style scoped>
.delete-btn {
}
</style>
