<script setup lang="ts">
  import { PatientsRegister } from 'hospital-lib'
  import Title from '../atoms/Title.vue'

  const props = defineProps<{
    drugs: string[] | undefined,
    results: {
      input: number,
      output: number
    }[],
    total: number
  }>()

  /**
   * @method getDrugsGiven
   *
   * @description
   *  Get the drugs that were given to the patients at a given index
   *
   * @param {number} index
   *  The index of the drugs to get
   *
   * @returns {string}
   *  The drugs that were given to the patients at the given index
   */
  const getDrugsGiven = (index: number) : string => {
    const drugsGiven: string = props.drugs[props.results.length - index - 1]

    return drugsGiven ? drugsGiven : 'none'
  }
</script>

<template>
  <section>
    <Title
      icon="fa-solid fa-vial-virus"
      title="Results"
      sub="The Results of the Quarantine"
    />

    <table
      v-for="(result, index) in results.slice().reverse()"
      :key="index"
    >
      <caption>
        <i
          class="fa-solid fa-building-lock"
          aria-hidden="true"
        ></i>

        <b>Quarantine #{{ total - index }}</b>
        <br>

        <i
          class="fa-solid fa-pills"
          aria-hidden="true"
        ></i>

        <i>Drugs given</i>: 
        {{ getDrugsGiven(index) }}
      </caption>

      <thead>
        <tr>
          <th>
            <i
              class="fa-solid fa-disease"
              aria-hidden="true"
            ></i>
            States
          </th>
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
    border-collapse: collapse;
  }

  th {
    border-collapse: collapse;
    border: 1px solid #000;
  }

  td {
    border-collapse: collapse;
    border: 1px solid #000;
  }

  table {
    display: inline-block;
    margin: 20px 50px;
    width: fit-content;
  }

  caption {
    padding: 10px;
  }

  th {
    padding: 10px;
  }
</style>
