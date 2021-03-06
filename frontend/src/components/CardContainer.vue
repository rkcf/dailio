<template>
  <div id="card-container">
    <draggable v-model="tasks" class="draggable">
      <TaskCard
        v-for="task in tasks"
        v-bind:task="task"
        v-bind:key="task.task_id"
        />
    </draggable>
    <button id="task-create-btn" v-on:click="openTaskCreate">
      <svg viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
      </svg>
    </button>
  </div>
</template>

<script>
import TaskCard from './TaskCard'
import draggable from 'vuedraggable'

export default {
  name: 'CardContainer',
  components: {
    TaskCard,
    draggable
  },
  computed: {
    tasks: {
      get () {
        return this.$store.getters.getTasks
      },
      set (newTasks) {
        // Update task order on backend and update state on dragging
        this.$store.dispatch('updateTaskOrder', newTasks)
          .then((newTasks) => {
            this.$store.commit('setTasks', newTasks)
          })
      }
    }
  },
  mounted: function () {
    // get tasks from api upon component mounting
    this.$store.dispatch('getTasks')
  },
  methods: {
    openTaskCreate () {
      // open modal popup for task creation
      this.$store.dispatch('openModal', 'create')
    }
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
}

#task-create-btn {
  fill: #FC913A;
  height: 6rem;
  width: 6rem;
  margin: auto;
  transition: all .5s ease;
  filter: drop-shadow( 2px 2px 2px #ddd);
}

.draggable {
  display: contents;
}

#task-create-btn:hover {
  fill: #FFA850;
  transform: perspective(1px) scale(1.2);
  filter: drop-shadow( 7px 5px 3px #ddd);
}

@media screen and(max-width:659px) {
  #card-container {
    grid-template-columns: 1fr;
  }
}

@media screen and (min-width:660px) {
  #card-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (min-width:1024px) {
  #card-container {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media screen and (min-width:1400px) {
  #card-container {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

</style>
