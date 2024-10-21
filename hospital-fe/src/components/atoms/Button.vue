<script setup lang="ts">
  defineProps<{
    class?: string,
    icon: string,
    label: string,
    action: () => void
  }>()
</script>

<template>
  <button
    :class="class"
    @click="action"
  >
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
    border: 2px solid transparent;
    padding: 0.6em 1.2em;
    width: 225px;
    font-size: 1.2rem;
    font-family: var(--monospace);
    background-color: var(--light);
    color: var(--dark);
    cursor: pointer;
    transition: all 500ms;

    i {
      font-size: 1.5rem;
      margin-right: 10px;
    }

    b {
      vertical-align: top;
    }

    &:hover,
    &:focus,
    &.active {
      border-color: var(--light);
      background-color: var(--primary);
      color: var(--light);
      transform: scale(0.95);
    }
  }
</style>
