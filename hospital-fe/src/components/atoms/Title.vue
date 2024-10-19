<script setup lang="ts">
  defineProps<{
    title: string,
    sub: string,
    lvl?: number
  }>()
</script>

<template>
  <hgroup>
    <h1 v-if="lvl === 1">
      {{ title }}
    </h1>

    <h2 v-else>
      {{ title }}
    </h2>
    
    <p>{{ sub }}</p>
  </hgroup>
</template>

<style scoped>
  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 1.5rem;
  }
</style>
