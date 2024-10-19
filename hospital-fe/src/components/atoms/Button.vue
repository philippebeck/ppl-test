<script setup lang="ts">
  defineProps<{ 
    label: string,
    action: () => void
  }>()
</script>

<template>
  <button @click="action">
    {{ label }}
  </button>
</template>

<style scoped>
  button {
    display: block;
    margin: auto;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 500ms;

    &:hover {
      border-color: #646cff;
    }

    &:focus,
    &:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
  }
</style>
