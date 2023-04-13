<template>
  <div class="searchContainer">
    <Suspense>
      <Search />
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import Search from "../components/Search.vue";
</script>

<style scoped>
.searchContainer{
  height: fit-content;
  width: 100%;
}
</style>