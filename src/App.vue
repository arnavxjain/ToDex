<template class="container">
  <FrameHeader
    :showAddTask="showAddTask"
    @toggle-newtask="toggleNewTask"
    head="ToDex"
  />
  <div v-show="showAddTask">
    <AddTask @new-task="newTask" />
  </div>
  <Tasks
    @delete-task="deleteTask"
    :tasks="tasks"
    @toggle-importance="toggleImportance"
    @toggle-check="toggleCheck"
  />

  <FrameButton clicker="fas fa-info" class="info-btn" />
</template>

<script>
import FrameHeader from "./components/FrameHeader";
import FrameButton from "./components/FrameButton";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

export default {
  components: {
    FrameHeader,
    Tasks,
    AddTask,
    FrameButton,
  },
  data() {
    return {
      tasks: [],
      showAddTask: false,
    };
  },
  methods: {
    async newTask(task) {
      const res = await fetch("http://localhost:5050/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();

      this.tasks = [...this.tasks, data];
    },

    async deleteTask(id) {
      const res = await fetch(`http://localhost:5050/tasks/${id}`, {
        method: "DELETE",
      });
      res.status === 200
        ? (this.tasks = this.tasks.filter((task) => task.id !== id))
        : alert("An Error Ocurred! Try reloading the page");
    },

    async toggleImportance(id) {
      const taskToToggle = await this.fetchTask(id);
      const updateTask = {
        ...taskToToggle,
        important: !taskToToggle.important,
      };

      const res = await fetch(`http://localhost:5050/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updateTask),
      });

      const data = await res.json();

      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, important: data.important } : task
      );
    },

    async toggleCheck(id) {
      const taskToToggle = await this.fetchTask(id);
      const updateTask = {
        ...taskToToggle,
        completed: !taskToToggle.completed,
      };

      const res = await fetch(`http://localhost:5050/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updateTask),
      });

      const data = await res.json();

      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, completed: data.completed } : task
      );
    },

    toggleNewTask() {
      this.showAddTask = !this.showAddTask;
      this.$emit("change-btn");
    },

    async fetchTasks() {
      const res = await fetch("http://localhost:5050/tasks");
      const data = await res.json();

      return data;
    },

    async fetchTask(id) {
      const res = await fetch(`http://localhost:5050/tasks/${id}`);
      const data = await res.json();

      return data;
    },
  },
  async created() {
    this.tasks = await this.fetchTasks();
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
  /* border: 2px solid #3f6080; */
  /* margin: 20px; */
  /* border-radius: 10px; */
  max-width: 700px;
  margin: auto;
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
.info-btn {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>
