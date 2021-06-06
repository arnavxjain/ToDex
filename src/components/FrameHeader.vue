<template>
  <div class="frame-header">
    <h1>{{ head }}</h1>
    <FrameButton clicker="fas fa-plus" />
  </div>
</template>

<script>
import FrameButton from "./FrameButton.vue";

export default {
  name: "FrameHeader",
  components: {
    FrameButton,
  },
  props: ["head"],
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
</style>