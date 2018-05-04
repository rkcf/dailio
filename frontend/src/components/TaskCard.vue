<template>
  <transition name="fade">
    <div v-bind:style="{ background: taskCardColor }" class="task-card raised">
        <div class="card-content">
          <button class="detail-btn" v-on:click="showTaskDetail(task.task_id)">
            <svg viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
            </svg>
          </button>
          <div class="task-name">
            <h3>{{ task.task_name }}</h3>
          </div>
          <transition name="popin">
            <div class="checkmark" v-show="task.task_completed">
              <svg viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
            </div>
          </transition>
          <p class="streak-count">{{ task.task_streak }}</p>
          <button class="btn raised complete-btn" v-on:click="toggleTaskCompletion(task.task_id)">done</button>
        </div>
      </div>
  </transition>
</template>

<script>
export default {
  name: 'TaskCard',
  props: ['task'],
  computed: {
    taskCardColor () {
      if (this.task.task_streak === 0) {
        return '#f5f5f5'
      } else if (this.task.task_streak <= 3) {
        return '#EFFBEF'
      } else if (this.task.task_streak < 7) {
        return '#D8F8D8'
      } else if (this.task.task_streak >= 7) {
        return '#A4EFA4'
      }
    }
  },
  methods: {
    showTaskDetail: function (id) {
      // Open a modal to display the details of a task
      this.$store.commit('setActiveTaskId', id)
      this.$store.dispatch('openModal', 'detail')
    },
    toggleTaskCompletion: function (id) {
      // Will toggle task completion state to true/false
      this.$store.dispatch('toggleTaskCompletion', id)
    }
  }
}
</script>

<style scoped>

.task-card {
  position: relative;
}

.task-card:before {
  display: block;
  padding-top: 100%;
  content: '';
}

.task-card .card-content{
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card-content {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
}

.task-name {
  grid-row: 1;
  grid-column: 2 / 5;
  place-self: center;
  width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
}

.task-name h3 {
  text-align: center;
  margin: 1rem 0 0 0;
  overflow: hidden;
}

.detail-btn {
  grid-row: 1;
  grid-column: 5;
  place-self: center;
  background: none;
  fill: #4ECDC4;
  width: 3rem;
  height: 3rem;
}

.checkmark {
  grid-row: 1;
  grid-column: 1;
  place-self: center;
  width: 2.5rem;
  height: 2.5rem;
}

.complete-btn {
  grid-row: 5;
  grid-column: 2 / 5;
  place-self: center;
  background: #4ECDC4;
  border: none;
  transition: all .4s ease;
}

.complete-btn:hover {
  background: #60DDD3;
  box-shadow: 3px 3px 4px #ccc;
}

.streak-count {
  grid-row: 2 / 5;
  grid-column: 2 / 5;
  place-self: center;
  font-family: sans-serif;
  font-size: 6rem;
}

</style>
