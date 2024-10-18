<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { PatientsRegister } from 'hospital-lib'

import Title from './components/atoms/Title.vue'
import Button from './components/atoms/Button.vue'
import Patients from './components/molecules/Patients.vue'
import Drugs from './components/molecules/Drugs.vue'

let patientsLoaded = ref<boolean>(false)
let drugsLoaded    = ref<boolean>(false)

let patients = ref<PatientsRegister | undefined>({})
let drugs    = ref<string[] | undefined>([])

const loadData = async (url: string) => {
  try {
    const response = await axios.get<string>('http://localhost:7200/' + url);

    return response.data;

  } catch (error) {
    console.error(error);
  }
}

const loadPatients = async () => {
  try {
    const data = await loadData("patients");

    patients.value = data
      ?.split(',')
      .reduce((acc: { [key: string]: number }, current: string) => {
        acc[current] = (acc[current] || 0) + 1;

        return acc;
      }, {});

    patientsLoaded.value = true;

  } catch (error) {
    console.error(error);
  }
}

const loadDrugs = async () => {
  try {
    const data        = await loadData('drugs');
    drugs.value       = data?.split(',');
    drugsLoaded.value = true;

  } catch (error) {
    console.error(error);
  }
}

const loadAllData = async () => {
  await loadPatients();
  await loadDrugs();
}
</script>

<template>
  <Title title="Hospital" sub="The Quarantine Simulation" :lvl="1"></Title>

  <Button :action="loadAllData" label="Load the Patients & the Drugs" />
  <Patients v-if="patientsLoaded" :patients="patients" />
  <Drugs v-if="drugsLoaded" :drugs="drugs" />
</template>

<style scoped></style>
