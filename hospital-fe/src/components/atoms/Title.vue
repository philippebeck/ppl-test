<script setup lang="ts">
  defineProps<{
    icon: string,
    title: string,
    sub: string,
    lvl?: number
  }>()
</script>

<template>
  <hgroup>
    <h1 v-if="lvl === 1">
      <i :class="icon"></i>
      {{ title }}
    </h1>

    <h2 v-else>
      <i
        :class="icon"
        aria-hidden="true"
      ></i>
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
