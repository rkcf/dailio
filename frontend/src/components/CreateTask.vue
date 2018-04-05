<template>
  <div>
    <h2>Create Task</h2>
    <input placeholder="Task Name" v-model="taskname">
    <button v-on:click="addTask(taskname)">Create</button>
  </div>
</template>

<script>
export default {
  name: 'CreateTask',
  data () {
    return {
      taskname: ''
    }
  },
  methods: {
    addTask: function (taskname) {
      this.$http.post('/api/tasks/', {task_name: taskname})
    }
  }
}
</script>

<style scoped>
</style>
