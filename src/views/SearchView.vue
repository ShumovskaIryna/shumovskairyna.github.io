<template>
  <div class="searchContainer">
    <Suspense>
      <Search />
      <template #fallback>
        <Loader/>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import Loader from "../components/Loader.vue";

import Search from "../components/Search.vue";
</script>

<style scoped>
.searchContainer{
  height: fit-content;
  width: 100%;
}
</style>