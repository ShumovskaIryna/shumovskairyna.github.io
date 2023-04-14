<template>
  <div class="weatherContainer">
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <Loader />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import Loader from '../components/Loader.vue'
import AsyncCityView from '../components/AsyncCityView.vue'
</script>

<style scoped>
.weatherContainer{
  height: fit-content;
  width: 100%;
}
</style>
