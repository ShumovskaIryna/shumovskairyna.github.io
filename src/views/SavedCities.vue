<template>
    <div class="container">
      <Suspense>
        <SavedCitiesView />
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
</template>
  
<script setup>
import SavedCitiesView from "../components/SavedCitiesView.vue";
</script>

<style scoped>
  .container{
    height: fit-content;
    width: 100%;
  }
</style>