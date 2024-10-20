<script setup lang="ts">
  import Title from '../atoms/Title.vue'

  defineProps<{drugs: string[] | undefined}>()

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
  p {
    font-family: var(--monospace);
  }
</style>
