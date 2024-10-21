<script setup lang="ts">
  import { PatientsRegister } from 'hospital-lib'
  import Title from '../atoms/Title.vue'

  defineProps<{patients: PatientsRegister | undefined}>()
</script>

<template>
  <section>
    <Title
      icon="fa-solid fa-hospital-user"
      title="Patients"
      sub="The List of Patients"
    />

    <ul>
      <li
        v-for="(value, key) in patients"
        :key="key"
      >
        {{ key }} : {{ value }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
  ul {
    display: flex;
    flex-flow: column;
    list-style: none;
    font-family: var(--monospace);
    font-size: 1.1rem;
    cursor: vertical-text;
  }
</style>
