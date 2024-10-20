<script setup lang="ts">
  import { Result } from '../../Result'
  import Title from '../atoms/Title.vue'

  const props = defineProps<{
    drugs: string[],
    results: Result[],
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

        <i>Drugs</i>: 
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
          <th>
            <i
              class="fa-solid fa-right-to-bracket"
              aria-hidden="true"
            ></i>
            Before
          </th>
          <th>
            <i
              class="fa-solid fa-right-from-bracket"
              aria-hidden="true"
            ></i>
            After
          </th>
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
    display: block;
    margin: auto;
    width: fit-content;
    background-color: var(--secondary);
  }

  table {
    display: inline-block;
    margin: var(--md);
    border-collapse: collapse;
    width: fit-content;
    font-family: var(--monospace);
  }

  th,
  td {
    background-color: var(--light);
  }

  th {
    border: 1px solid #000;
    border-collapse: collapse;
    padding: var(--sm);
    font-size: 0.9rem;

    [class*=fa] {
      display: block;
    }
  }

  td {
    border-collapse: collapse;
    border: 1px solid #000;
  }

  caption {
    padding: var(--md);

    [class*=fa] {
      margin-right: var(--sm);
    }
  }
</style>
