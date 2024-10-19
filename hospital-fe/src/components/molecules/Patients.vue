<script setup lang="ts">
  import { PatientsRegister } from 'hospital-lib';
  import Title from '../atoms/Title.vue'

  defineProps<{ patients: PatientsRegister | undefined }>()
</script>

<template>
  <section>
    <Title
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
  section {
    display: inline-block;
    margin: 20px;
    border-radius: 20px;
    padding: 20px;
    background-color: #FFF;
    color: #000;
  }

  ul {
    display: flex;
    place-content: space-evenly;
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
