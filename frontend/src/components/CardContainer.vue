<template>
  <div id="card-container">
    <TaskCard
      v-for="task in tasks"
      v-bind:task="task"
      v-bind:key="task.task_id"
    />
    <button id="add-card" v-on:click="$store.dispatch('openModal', 'create')">
      <svg viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
      </svg>
    </button>
  </div>
</template>

<script>
import TaskCard from './TaskCard'

export default {
  name: 'CardContainer',
  components: {
    TaskCard
  },
  computed: {
    tasks () {
      return this.$store.state.tasks
    }
  },
  mounted: function () {
    this.$store.commit('getTasks')
  }
}
</script>

<style scoped>
#card-container {
  grid-column: 2 / 5;
  padding: 1rem 0 1rem 0;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

#add-card {
  fill: #FC913A;
  height: 6rem;
  width: 6rem;
  margin: auto;
}
</style>
