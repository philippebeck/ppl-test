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
      <i 
        :class="icon"
        aria-hidden="true"
      ></i>
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
  hgroup {
    margin-bottom: var(--lg);
  }

  h1,
  h2 {
    font-family: var(--serif);
  }

  h1 {
    font-size: 2.4rem;
    text-decoration: underline;
    color: var(--secondary);

    & + p {
      font-size: 1.6rem;
    }
  }

  h2 {
    font-size: 1.8rem;
    color: var(--primary);

    & + p {
      font-size: 1.2rem;
    }
  }
</style>
