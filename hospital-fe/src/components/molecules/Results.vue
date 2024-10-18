<script setup lang="ts">
import { PatientsRegister } from 'hospital-lib';
import Title from '../atoms/Title.vue'

defineProps<{ patients: PatientsRegister | undefined, results: PatientsRegister | undefined }>()

</script>

<template>
  <article>
    <Title title="Results" sub="The Results of the Quarantine" />

    <!-- TODO: switch to a table to display the last 10 results -->

    <section>
      <Title title="Input" sub="The Patients before the Quarantine" />
      <ul>
        <li v-for="(value, key) in patients" :key="key">{{ key }} : {{ value }}</li>
      </ul>
    </section>

    <section>
      <Title title="Output" sub="The Patients after the Quarantine" />
      <ul>
        <li v-for="(value, key) in results" :key="key">{{ key }} : {{ value }}</li>
      </ul>
    </section>
  </article>
</template>

<style scoped>
  article {
    margin: 20px;
    border-radius: 20px;
    padding: 20px;
    background-color: #FFF;
    color: #000;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
