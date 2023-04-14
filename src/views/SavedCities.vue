<template>
  <div class="citiesContainer">
    <Suspense>
      <SavedCitiesView />
      <template #fallback>
        <Loader />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import Loader from '../components/Loader.vue'
import SavedCitiesView from '../components/SavedCitiesView.vue'
</script>

<style scoped>
.citiesContainer{
  height: fit-content;
  width: 100%;
}
</style>
