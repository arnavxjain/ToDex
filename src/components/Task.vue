<template>
  <div
    @dblclick="$emit('toggle-reminder', task.id)"
    :class="[task.reminder ? 'reminder' : '', 'task']"
  >
    <div :class="[task.completed ? 'completed-task-info' : '', 'task-info']">
      <h3>{{ task.text }}</h3>
      <label>{{ task.day }}</label>
    </div>
    <div class="task-btns">
      <FrameButton
        @click="$emit('delete-task', task.id)"
        class="task-btn del"
        clicker="fas fa-times"
      />
      <FrameButton clicker="fas fa-check" class="task-btn checker" />
    </div>
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
@keyframes scaleup {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
.completed-task-info {
  text-decoration: line-through;
}
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
  transition: 200ms ease-in-out;
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
  animation: scaleup 0.2s;
}
.task:hover .task-btn {
  display: block;
}
.reminder {
  transition: 200ms ease-in-out;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border-left: 10px solid #1b2e4e;
}
.task-btns {
  display: flex;
  align-items: center;
}
.checker {
  margin-left: 8px;
}
.checker:hover {
  background-color: #008013;
  color: black;
}
.del:hover {
  background-color: #ff4040;
  color: black;
}
</style>