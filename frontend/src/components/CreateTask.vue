<template>
  <div>
    <div id="modal-header">
      <h2>Create Task</h2>
    </div>
    <div id="modal-body">
      <input placeholder="Task Name" v-model="taskname"
    ><button class="btn" v-on:click="addTask(taskname)">Create</button>
    </div>
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
      this.$store.dispatch('addTask', taskname)
    }
  }
}
</script>

<style scoped>
</style>
