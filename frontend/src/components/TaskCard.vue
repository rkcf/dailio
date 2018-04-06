<template>
  <transition name="fade">
    <div class="task-card">
      <button class="delete-btn" v-on:click="deleteTask(task.task_id)">
        <svg viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </button>
      <h3>{{ task.task_name }}</h3>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TaskCard',
  props: ['task'],
  methods: {
    deleteTask: function (id) {
      this.$store.dispatch('deleteTask', id)
    }
  }
}
</script>

<style scoped>
.task-card {
  background: #eee;
  padding: 1rem;
  text-align: center;
}

.delete-btn {
  float: right;
  height: 1rem;
  width: 1rem;
  background: none;
}
</style>
