<script setup lang="ts">
  import { PatientsRegister } from 'hospital-lib'
  import Title from '../atoms/Title.vue'

  const props = defineProps<{
    drugs: string[] | undefined,
    results: { input: number, output: number }[],
    total: number
  }>()

  /**
   * @method getDrugsGiven
   * @description - Get the drugs that were given to the patients at a given index
   * @param {number} index - The index of the drugs to get
   * @returns {string} - The drugs that were given to the patients at the given index
   */
  const getDrugsGiven = (index: number) => {
    const drugsGiven = props.drugs[props.results.length - index - 1]

    return drugsGiven ? drugsGiven : 'none'
  }
</script>

<template>
  <section>
    <Title
      title="Results"
      sub="The Results of the Quarantine"
    />

    <table
      v-for="(result, index) in results.slice().reverse()"
      :key="index"
    >
      <caption>
        <b>Quarantine #{{ total - index }}</b>
        <br>
        <i>Drugs given</i>: 
        {{ getDrugsGiven(index) }}
      </caption>

      <thead>
        <tr>
          <th>States</th>
          <th>Before</th>
          <th>After</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(value, key) in result"
          :key="key"
        >
          <td>{{ key }}</td>
          <td>{{ value.input }}</td>
          <td>{{ value.output }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
  section {
    margin: 20px;
    border-radius: 20px;
    padding: 20px;
    background-color: #FFF;
    color: #000;
  }

  table {
    margin: 50px auto;
    border: 2px solid #000;
    width: 100%;
  }

  caption {
    margin-bottom: 20px;
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
</style>
