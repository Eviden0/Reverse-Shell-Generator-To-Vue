<template>
  <div class="app">
    <MainBoard />
  </div>
</template>

<script setup lang='ts'>
import MainBoard from './components/MainBoard.vue';
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  justify-content: center;
  // width: 100vw;
   min-height: 100vh;
  // overflow-y:auto;
  background-color: #f0f0f0;
  // box-sizing: border-box;
}
</style>