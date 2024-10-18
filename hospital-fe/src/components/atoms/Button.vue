<script setup lang="ts">

defineProps<{ label: string, action: () => void }>()

</script>

<template>
  <button @click="action">{{ label }}</button>
</template>

<style scoped>
  button {
    display: block;
    margin: auto;
  }
</style>
