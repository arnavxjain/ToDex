<template>
  <button class="frame-btn"><i :class="clicker"></i></button>
</template>

<script>
export default {
  name: "FrameButton",
  props: ["clicker"],
};
</script>

<style scoped>
.frame-btn {
  font-size: 13px;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  border: none;
  background-color: #333333;
  color: gray;
  cursor: pointer;
  text-align: center;
  transition: 200ms ease-in-out;
}
.frame-btn:hover {
  background-color: #444444;
  transition: 200ms ease-in-out;
}
</style>