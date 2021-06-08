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

  <FrameButton
    v-show="!showingInfo"
    :clicker="showingInfo ? 'fas fa-arrow-down' : 'fas fa-info'"
    class="info-btn show-info-btn"
    @click="showInfo"
  />

  <div class="info">
    <h1 style="margin: 0">ToDex</h1>
    <h3 style="margin: 0">The Ultimate UI Vue Based Task Planner</h3>
    <FrameButton
      clicker="fas fa-arrow-down"
      class="info-btn close-info"
      @click="hideInfo"
    />
    <hr />
    <p>
      <b>ToDex</b> is a task planner developed and maintained by
      <a href="https://arnavjain.in">Arnav Jain</a>. Using VueJS as its
      acceleration framework, JSON-SERVER for database mapping and FontAwesome
      for its amazing UI, <b>ToDex</b> is the way to go.
    </p>
    <hr />
    <a style="margin-bottom: 7px" href="https://github.com/arnavjainn06/ToDex"
      >View On GitHub</a
    >
  </div>
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
      showingInfo: false,
    };
  },
  methods: {
    showInfo() {
      document.getElementsByClassName("info")[0].style.display = "flex";
      this.showingInfo = true;
    },
    hideInfo() {
      document.getElementsByClassName("info")[0].style.transform =
        "translateY(-500px)";
      // document.getElementsByClassName("info")[0].style.display = "none";
      // document.getElementsByClassName("info")[0].style.transform =
      //   "translateY(0)";
      document.getElementsByClassName("info")[0].style.animation =
        "slidedown 0.6s";
      setTimeout(() => {
        document.getElementsByClassName("info")[0].style.display = "none";
        document.getElementsByClassName("info")[0].style.animation =
          "slideup 0.6s";
        document.getElementsByClassName("info")[0].style.transform =
          "translateY(0)";
      }, 600);
      this.showingInfo = false;
    },
    async newTask(task) {
      const res = await fetch("api/tasks", {
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
      const res = await fetch(`api/tasks/${id}`, {
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

      const res = await fetch(`api/tasks/${id}`, {
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

      const res = await fetch(`api/tasks/${id}`, {
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
      const res = await fetch("api/tasks");
      const data = await res.json();

      return data;
    },

    async fetchTask(id) {
      const res = await fetch(`api/tasks/${id}`);
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
.container {
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
  overflow-y: hidden;
  transition: top 0.4s;
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
@keyframes slideup {
  from {
    transform: translateY(500px);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes slidedown {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(500px);
  }
}
.info {
  box-shadow: 1px 4px 8px rgb(30, 30, 30);
  padding: 10px;
  border-radius: 10px;
  background-color: rgb(40, 40, 40);
  width: 80%;
  position: absolute;
  display: none;
  flex-direction: column;
  bottom: 40px;
  left: 0;
  right: 0;
  margin: auto;
  animation: slideup 0.6s;
  max-width: 500px;
}
.info p {
  color: #8498ac;
  margin: 0;
  margin-top: 4px;
  margin-bottom: 4px;
}
hr {
  width: 90%;
  border: none;
  height: 1px;
  background-color: rgb(50, 50, 50);
  margin-top: 10px;
  margin-bottom: 10px;
}
a {
  color: rgb(149, 149, 149);
  text-decoration: underline;
  transition: 200ms ease-in-out;
}
a:hover {
  color: #3f6080;
  transition: 200ms ease-in-out;
}
.close-info {
  position: absolute;
  right: 14px;
  top: 14px;
}
@keyframes scaleup {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
.show-info-btn {
  animation: scaleup 0.3s;
}
</style>
