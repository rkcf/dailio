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
          <h3>
            {{ task.task_name }}
          </h3>
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
  text-align: center;
  box-sizing: border-box;
}

.task-card:before {
  display: block;
  padding-top: 100%;
  content: '';
}

.task-card .card-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.task-card h3 {
  margin-top: 1rem;
}

.detail-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  height: 3rem;
  width: 3rem;
  background: none;
  fill: #4ECDC4;
}

.checkmark {
  position: absolute;
  top: 1rem;
  left: 1rem;
  height: 2.5rem;
  width: 2.5rem;
}

.complete-btn {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 1rem;
  background: #4ECDC4;
  border: none;
  width: 5rem;
  transition: all .4s ease;
}

.complete-btn:hover {
  background: #60DDD3;
  box-shadow: 3px 3px 4px #ccc;
}

.streak-count {
  font-family: sans-serif;
  font-size: 10rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  margin: 0;
}

</style>
