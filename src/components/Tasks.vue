<template>
  <div :key="task.id" v-for="task in tasks">
    <Task
      @toggle-importance="$emit('toggle-importance', task.id)"
      @delete-task="$emit('delete-task', task.id)"
      @toggle-check="$emit('toggle-check', task.id)"
      :task="task"
    />
  </div>
</template>

<script>
import Task from "./Task";

export default {
  name: "Tasks",
  props: {
    tasks: Array,
  },
  components: {
    Task,
  },
  emits: ["delete-task", "toggle-importance", "toggle-check"],
};
</script>