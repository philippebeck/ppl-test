<script setup lang="ts">
  import Title from '../atoms/Title.vue'

  defineProps<{
    drugs: string[] | undefined
  }>()

  /**
   * @method getDrugsLoaded
   *
   * @description
   *  Get the drugs loaded
   *
   * @param {string[] | undefined} drugs
   *  The drugs to get
   *
   * @returns {string}
   *  The text representation of the drugs
   */
  const getDrugsText = (drugs: string[] | undefined) : string => {

    return drugs && drugs.some(drug => drug !== '') ? drugs.join(', ') : 'none'
  }
</script>

<template>
  <section>
    <Title
      icon="fa-solid fa-pills"
      title="Drugs"
      sub="The List of Drugs"
    />

    <p>{{ getDrugsText(drugs) }}</p>
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
  }
</style>
