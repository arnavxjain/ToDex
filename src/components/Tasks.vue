<template>
  <div :key="task.id" v-for="task in tasks" v-show="tasks.length > 0">
    <Task
      @toggle-importance="$emit('toggle-importance', task.id)"
      @delete-task="$emit('delete-task', task.id)"
      @toggle-check="$emit('toggle-check', task.id)"
      :task="task"
    />
  </div>
  <div class="no-task-div" v-show="tasks.length === 0 || !tasks">
    <img class="no-task-div" src="../assets/no-tasks.svg" />
  </div>
</template>

<script>
import Task from "./Task";

export default {
  name: "Tasks",
  props: {
    tasks: Array,
  },
  data() {
    return {
      noTasks: this.tasks.length === 0 ? true : false,
      // noTasks: false,
    };
  },
  components: {
    Task,
  },
  emits: ["delete-task", "toggle-importance", "toggle-check"],
};
</script>

<style scoped>
.no-task-div {
  width: 300px;
  margin: auto;
}
</style>