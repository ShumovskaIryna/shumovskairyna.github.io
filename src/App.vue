<template>
  <div class="container">
    <header className="header">
      <Navigation />
    </header>
    <main className="routerView">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
</script>

<style scoped>
.container {
  background-color: rgba(0, 0, 0, 0.4);
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 80px;
  height: fit-content;
}
.header {
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 90;
}
.routerView {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 360px;
}
@media (max-width:1300px) {
  .container {
    max-width: 970px;
  }
  .routerView {
    min-width: 992px;
  }
}
@media (max-width:992px) {
  .container {
    max-width: 750px;
  }
  .routerView {
    min-width: 767px;
  }
}
@media (max-width:767px) {
  .container {
    max-width: 520px;
  }
  .routerView {
    min-width: 530px;
  }
}
@media (max-width:530px) {
  .container {
    max-width: 450px;
  }
  .routerView {
    min-width: 360px;
  }
}
@media (max-width:350px) {
  .container {
    max-width: 300px;
  }
}
</style>
