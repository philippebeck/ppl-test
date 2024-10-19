<script setup lang="ts">
import { PatientsRegister } from 'hospital-lib';
import Title from '../atoms/Title.vue'

defineProps<{ drugs: string[] | undefined, results: { [key: string]: { input: number, output: number } } }>()

</script>

<template>
  <article>
    <Title title="Results" sub="The Results of the Quarantine" />

    <!-- TODO: switch to a table to display the last 10 results -->

    <table>
      <caption>
        <i>Drugs given</i>: {{ drugs }}
      </caption>
      <thead>
        <tr>
          <th>States</th>
          <th>Before</th>
          <th>After</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in results" :key="key">
          <td>{{ key }}</td>
          <td>{{ value.input }}</td>
          <td>{{ value.output }}</td>
        </tr>
      </tbody>
    </table>
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

  table,
  th,
  td {
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #000;
  }

  table {
    margin: auto;
    border: 2px solid #000;
    width: 100%;
  }

  caption {
    margin-bottom: 20px;
  }
</style>
