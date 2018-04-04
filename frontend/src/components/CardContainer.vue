<template>
  <div id="card-container">
    <div class="card" v-for="task in tasks" :key="task.task_id">
      <h3>{{ task.task_name }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardContainer',
  data () {
    return {
      tasks: []
    }
  },
  mounted: function () {
    this.getTasks()
  },
  methods: {
    getTasks: function () {
      this.$http.get('/api/tasks/')
        .then((response) => {
          this.tasks = response.data
        })
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
</style>
