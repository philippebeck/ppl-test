<script setup lang="ts">
  defineProps<{
    icon: string,
    label: string,
    action: () => void
  }>()
</script>

<template>
  <button
    @click="action">
    <i
      :class="icon"
      aria-hidden="true"
    ></i>

    <b>{{ label }}</b>
  </button>
</template>

<style scoped>
  button {
    display: inline-block;
    margin: var(--md);
    border-radius: 50px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    width: 220px;
    font-size: 1.2rem;
    font-family: var(--monospace);
    background-color: var(--light);
    color: var(--dark);
    cursor: pointer;
    transition: color 500ms;

    i {
      font-size: 1.5rem;
      margin-right: 10px;
    }

    b {
      vertical-align: top;
    }

    &:hover,
    &:focus,
    .active {
      color: var(--primary);
    }
  }
</style>
