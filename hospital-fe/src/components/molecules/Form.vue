<script setup lang="ts">
  import Title from '../atoms/Title.vue'

  defineProps<{
    handleSubmitManualInput: () => void,
    manualPatients: string,
    manualDrugs: string
  }>()

  defineEmits(['update:manualPatients', 'update:manualDrugs'])
</script>

<template>
  <section>
    <Title
      icon="fa-solid fa-pen-to-square"
      title="Form"
      sub="Type Patients & Drugs"
    />

    <form @submit.prevent="handleSubmitManualInput">
      <fieldset>
        <label for="patients">Patients:</label>

        <input
          id="patients"
          type="text"
          title="Separated by commas"
          :value="manualPatients"
          @input="$emit(
            'update:manualPatients',
            ($event.target as HTMLInputElement).value
          )"
        >
      </fieldset>

      <fieldset>
        <label for="drugs">Drugs:</label>

        <input 
          id="drugs"
          type="text"
          title="Separated by commas"
          :value="manualDrugs"
          @input="$emit(
            'update:manualDrugs',
            ($event.target as HTMLInputElement).value
          )"
        >
      </fieldset>

      <input
        type="submit"
        value="Validate"
      >
    </form>
  </section>
</template>

<style scoped>
  form {
    display: flex;
    flex-flow: column;
    gap: var(--md);
  }

  fieldset {
    display: flex;
    place-content: space-between;
    border: none;
  }

  label {
    margin-right: var(--sm);
    text-decoration: underline double;
  }

  [type=text] {
    border: 2px solid var(--dark);
    border-radius: var(--md);
    padding: var(--sm);
  }

  [type=submit] {
    margin: auto;
    border: 2px solid transparent;
    border-radius: var(--lg);
    padding: var(--sm) var(--md);
    width: fit-content;
    font-family: var(--monospace);
    font-size: 1.2rem;
    font-weight: bold;
    background-color: var(--primary);
    color: var(--light);
    cursor: pointer;

    &:hover,
    &:focus {
      border-color: var(--primary);
      background-color: var(--light );
      color: var(--primary);
    }
  }
</style>
