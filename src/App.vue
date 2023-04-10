<template>
  <div class="homeContainer">
    <div className="header">
      <Navigation />
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue"
</script>

<style scoped>
  body {
  margin: 0;
  }

  .homeContainer {
    background-color: #d3d3d3;
    min-height: 100vh;
    width: 100%;
    height: auto;
  }
  .header {
    display: flex;
    justify-content: space-between;
  }
</style>