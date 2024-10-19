<script setup lang="ts">
import { PatientsRegister } from 'hospital-lib';
import Title from '../atoms/Title.vue'

defineProps<{ drugs: string[] | undefined, resultsList: { input: number, output: number }[], total: number }>()

</script>

<template>
  <article>
    <Title title="Results" sub="The Results of the Quarantine" />

    <table v-for="(result, index) in resultsList.slice().reverse()" :key="index">
      <caption>
        <b>Quarantine #{{ total - index }}</b>
        <br>
        <i>Drugs given</i>: {{ drugs[resultsList.length - index - 1] ? drugs[resultsList.length - index - 1] : 'none' }}
      </caption>
      <thead>
        <tr>
          <th>States</th>
          <th>Before</th>
          <th>After</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in result" :key="key">
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
    margin: 50px auto;
    border: 2px solid #000;
    width: 100%;
  }

  caption {
    margin-bottom: 20px;
  }
</style>
