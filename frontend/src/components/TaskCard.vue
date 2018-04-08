<template>
  <transition name="fade">
  <div class="task-card">
    <button class="detail-btn" v-on:click="showTaskDetail(task.task_id)">
      <svg viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
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
    showTaskDetail: function (id) {
      // Open a modal to display the details of a task
      this.$store.commit('setActiveTaskId', id)
      this.$store.dispatch('openModal', 'detail')
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

.detail-btn {
  float: right;
  height: 1rem;
  width: 1rem;
  background: none;
}
</style>
