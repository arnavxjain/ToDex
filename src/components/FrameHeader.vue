<template>
  <div class="frame-header">
    <h1>{{ head }}</h1>
    <FrameButton
      :class="[showAddTask ? 'rotate' : '', 'header-btn']"
      clicker="fas fa-plus"
      @click="toggleNewTask"
    />
  </div>
</template>

<script>
import FrameButton from "./FrameButton.vue";

export default {
  name: "FrameHeader",
  components: {
    FrameButton,
  },
  props: {
    head: String,
    showAddTask: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    toggleNewTask() {
      this.$emit("toggle-newtask");
    },
  },
};
</script>

<style scoped>
.frame-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 30px;
  border-radius: 10px;
}
.rotate {
  transform: rotate(-45deg);
}
.header-btn {
  z-index: 99;
}
</style>