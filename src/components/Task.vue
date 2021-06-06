<template>
  <div
    @dblclick="$emit('toggle-reminder', task.id)"
    :class="[task.reminder ? 'reminder' : '', 'task']"
  >
    <div class="task-info">
      <h3>{{ task.text }}</h3>
      <label>{{ task.day }}</label>
    </div>
    <FrameButton
      @click="$emit('delete-task', task.id)"
      class="task-btn"
      clicker="fas fa-times"
    />
  </div>
</template>

<script>
import FrameButton from "../components/FrameButton.vue";

export default {
  name: "Task",
  props: {
    task: Object,
  },
  components: {
    FrameButton,
  },
};
</script>

<style scoped>
.task {
  background-color: rgb(40, 40, 40);
  margin: 20px;
  border-radius: 10px;
  display: flex;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 1px;
  padding-right: 15px;
  align-items: center;
  justify-content: space-between;
}
h3 {
  margin: 0;
}
label {
  margin-left: 20px;
}
.task-btn {
  display: none;
  transition: 100ms ease-in-out;
}
.task:hover .task-btn {
  display: block;
}
.reminder {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border-left: 10px solid #1b2e4e;
}
</style>