<template>
    <div>
      <Suspense>
        <CityCard />
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
</template>
  
<script setup>
import CityCard from "../components/CityCard.vue";
</script>