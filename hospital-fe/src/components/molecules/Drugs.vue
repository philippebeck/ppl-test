<script setup lang="ts">
  import Title from '../atoms/Title.vue'

  defineProps<{ drugs: string[] | undefined }>()
</script>

<template>
  <section>
    <Title
      title="Drugs"
      sub="The List of Drugs"
    />

    <ul>
      <li
        v-for="drug in drugs"
        :key="drug"
      >
        {{ drug }}
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
