<template>
  <div class="add-task">
    <h2 style="margin-top: 0; margin-bottom: 5px">Add New Task</h2>
    <input v-model="title" type="text" placeholder="Task Title" />
    <input v-model="day" type="text" placeholder="Date And Time" />
    <div class="tasker">
      <input v-model="important" type="checkbox" id="label-main" />
      <label for="label-main">Mark As Important</label>
    </div>
    <button @click="addTask" :disabled="!title || !day" class="task-btn">
      Add <i class="fas fa-plus"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "AddTask",
  data() {
    return {
      title: "",
      day: "",
      important: this.important,
    };
  },
  components: {},
  methods: {
    addTask() {
      const newTaskObj = {
        // id: Math.floor(Math.random() * 100000),
        text: this.title,
        day: this.day,
        important: this.important,
        completed: false,
      };

      this.$emit("new-task", newTaskObj);

      this.title = "";
      this.day = "";
      this.important = false;
    },
  },
  emits: ["new-task"],
};
</script>

<style scoped>
@keyframes liftup2 {
  from {
    transform: translateY(-500px);
  }
  to {
    transform: translateY(0);
  }
}
.add-task {
  box-shadow: 10px 14px 18px rgb(30, 30, 30);
  padding: 10px;
  border-radius: 10px;
  background-color: rgb(40, 40, 40);
  width: 90%;
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0;
  left: 0;
  margin: auto;
  top: 80px;
  animation: liftup2 0.6s;
}
input {
  background-color: rgb(47, 47, 47);
  border: none;
  padding: 4px;
  text-indent: 5px;
  height: 30px;
  border-radius: 10px;
  color: gray;
  outline: none;
  font-size: 14px;
  width: 95%;
  border-left: 8px solid #1b2e4e;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  margin-bottom: 10px;
}

hr {
  width: 95%;
  background-color: rgb(52, 52, 52);
  border: none;
  height: 2px;
  margin-top: 10px;
}
.tasker {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: fit-content;
}
#label-main {
  padding: 0;
  margin: 0;
  width: 15px;
  margin-right: 5px;
}
.task-btn {
  background-color: rgb(40, 40, 40);
  color: gray;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  cursor: pointer;
}
.task-btn:disabled {
  cursor: default;
  color: rgb(81, 81, 81);
}
.close-task-btn {
  position: absolute;
  right: 15px;
  top: 11px;
}
</style>