<template>
  <div class="weatherContainer">
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </div>
</template>
  
<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
</script>

<style scoped>
.weatherContainer{
  height: fit-content;
  width: 100%;
}
</style>