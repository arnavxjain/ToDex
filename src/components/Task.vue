<template>
  <div
    @dblclick="$emit('toggle-importance', task.id)"
    :class="[
      task.important ? (task.completed ? 'reminder-comp' : 'reminder') : '',
      'task',
    ]"
  >
    <div :class="[task.completed ? 'completed-task-info' : '', 'task-info']">
      <h3 class="h3-main">{{ task.text }}</h3>
      <label class="h3-minor">{{ task.day }}</label>
    </div>
    <div class="task-btns">
      <FrameButton
        @click="$emit('delete-task', task.id)"
        class="task-btn del"
        clicker="fas fa-trash"
      />
      <FrameButton
        @click="$emit('toggle-check', task.id)"
        v-if="task.completed"
        clicker="fas fa-times"
        class="task-btn uncheck"
      />
      <FrameButton
        @click="$emit('toggle-check', task.id)"
        v-else
        clicker="fas fa-check"
        class="task-btn checker"
      />
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
.task-info {
  margin-left: 15px;
  width: fit-content;
  justify-content: left !important;
}
.completed-task-info {
  color: rgb(74, 74, 74);
  text-decoration: line-through;
  transition: 200ms ease-in-out;
}
.task {
  animation: scaleup 0.4s;
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
.h3-main {
  margin: 0 !important;
  transform: translateX(-10px);
  transition: 200ms ease-in-out;
}
.h3-minor {
  transition: 200ms ease-in-out;
  text-align: left;
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
.reminder-comp {
  transition: 200ms ease-in-out;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border-left: 10px solid #2c2c2c;
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
  transition: 100ms ease-in-out;
  color: black;
}
.del:hover {
  background-color: #ff4040;
  transition: 100ms ease-in-out;
  color: black;
}
.uncheck {
  margin-left: 8px;
}
.uncheck:hover {
  background-color: #ff4040;
  transition: 100ms ease-in-out;
  color: black;
}
</style>