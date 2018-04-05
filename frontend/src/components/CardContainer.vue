<template>
  <div id="card-container">
    <div class="card" v-for="task in tasks" :key="task.task_id">
      <button class="delete-btn" v-on:click="deleteTask(task.task_id)">
        <svg viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </button>
      <h3>{{ task.task_name }}</h3>
    </div>
    <div id="add-card">
      <button v-on:click="$store.commit('openModal')">
        <svg viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardContainer',
  computed: {
    tasks () {
      return this.$store.state.tasks
    }
  },
  mounted: function () {
    this.$store.commit('getTasks')
  },
  methods: {
    deleteTask: function (id) {
      this.$store.dispatch('deleteTask', id)
    }
  }
}
</script>

<style scoped>
#card-container {
  grid-column: 2 / 5;
  padding-top: 1rem;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(200px, auto);
}

.card {
  background: #eee;
  padding: 1rem;
  text-align: center;
}

#add-card {
  fill: #FC913A;
  height: 4rem;
  width: 4rem;
  display: block;
  margin: auto;
}

.delete-btn {
  float: right;
  height: 1rem;
  width: 1rem;
  background: none;
}
</style>
