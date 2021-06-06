<template class="container">
  <FrameHeader head="ToDex" />
  <Tasks
    @delete-task="deleteTask"
    :tasks="tasks"
    @toggle-reminder="toggleReminder"
  />
</template>

<script>
import FrameHeader from "./components/FrameHeader";
import Tasks from "./components/Tasks";

export default {
  components: {
    FrameHeader,
    Tasks,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    toggleReminder(id) {
      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      );
    },
  },
  created() {
    this.tasks = [
      {
        id: 1,
        text: "This is Task 1",
        day: "June 6 at 9:15pm",
        reminder: true,
      },
      {
        id: 2,
        text: "This is Task 2",
        day: "June 8 at 9:15pm",
        reminder: true,
      },
      {
        id: 3,
        text: "This is Task 3",
        day: "June 10 at 9:15pm",
        reminder: false,
      },
    ];
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
* {
  font-family: "Poppins", sans-serif;
}
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3f6080;
  background-color: #222222;
  /* padding: 10px; */
  border: 2px solid #3f6080;
  margin: 20px;
  border-radius: 10px;
}

.frame-form {
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.todex-entry {
  background-color: #333333;
  border: none;
  border-radius: 9px;
  height: 32px;
  text-indent: 5px;
  width: 100%;
  outline: none;
  margin-right: 10px;
  border: 2px solid transparent;
  color: gray;
  transition: 200ms ease-in-out;
  box-shadow: 2px 5px 8px #1e1e1e;
  margin-top: 2px;
}
.todex-entry:focus {
  box-shadow: 0 0 5px #3f6080;
  border: 2px solid #3f6080;
}
</style>
