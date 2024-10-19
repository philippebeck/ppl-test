<script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'
  import { PatientsRegister } from 'hospital-lib'
  // TODO: import the Quarantine class from the dist folder
  import { Quarantine } from 'hospital-lib/src/quarantine'

  import Title from './components/atoms/Title.vue'
  import Button from './components/atoms/Button.vue'
  import Patients from './components/molecules/Patients.vue'
  import Drugs from './components/molecules/Drugs.vue'
  import Results from './components/molecules/Results.vue'

  const totalTests     = ref<number>(0)
  const patientsLoaded = ref<boolean>(false)
  const drugsLoaded    = ref<boolean>(false)
  const resultsLoaded  = ref<boolean>(false)

  const patients     = ref<PatientsRegister | undefined>({})
  const drugs        = ref<string[] | undefined>([])
  const currentDrugs = ref<string[] | undefined>([])
  const drugsList    = ref<string[]>([])
  const results      = ref<{ [key: string]: { input: number, output: number } }>({})
  const resultsList  = ref<{ input: number, output: number }[]>([])

  /**
   * @method getData
   *
   * @description
   *  Make a GET request to the given endpoint & return the response data
   *
   * @param {string} endpoint
   *  The endpoint to make the request to
   *
   * @returns {Promise<string | undefined>}
   *  The response data of the request
   */
  const getData = async (endpoint: string) => {
    const URL = `http://localhost:7200/${endpoint}`

    try {
      const response = await axios.get<string>(URL)

      return response.data

    } catch (error) {
      console.error(error)
    }
  }

  /**
   * @method formatPatientsData
   *
   * @description
   *  Parses a string of patient states & counts occurrences of each state
   *
   * @param {string} data
   *  A comma-separated string representing patient states
   *
   * @returns {Object}
   *  An object with the counts of each state, initialized with default values
   */
  const formatPatientsData = (data) => {

    return data
      ?.split(',')
      .reduce((acc: { [key: string]: number }, current: string) => {
        const defaultState = { F: 0, H: 0, D: 0, T: 0, X: 0 }

        acc = { ...defaultState, ...acc }
        acc[current] = (acc[current] || 0) + 1

        return acc
      }, {})
  }

  /**
   * @method loadPatients
   *
   * @description
   *  Load the patients from the API & put them in the state
   *
   * @returns {Promise<void>}
   */
  const loadPatients = async () => {
    const data = await getData("patients")

    patients.value       = formatPatientsData(data)
    patientsLoaded.value = true
  }

  /**
   * @method loadDrugs
   *
   * @description
   *  Load the drugs from the API and put them in the state
   *
   * @returns {Promise<void>}
   */
  const loadDrugs = async () => {
    const data = await getData('drugs')

    currentDrugs.value = data
    drugs.value = data?.split(',')

    drugsLoaded.value = true
  }

  /**
   * @method loadData
   *
   * @description
   *  Load the initial data for the simulation
   *
   * @returns {Promise<void>}
   */
  const loadData = async () => {
    await loadPatients()
    await loadDrugs()
  }

  /**
   * @method reportResults
   *
   * @description
   *  Simulate a quarantine, add the result to the results list and update the UI
   *
   * @returns {Promise<void>}
   */
  const reportResults = async () => {
    if (patients.value) {
      const quarantine   = new Quarantine(patients.value)

      quarantine.setDrugs(currentDrugs.value)
      quarantine.wait40Days()

      const newResult = Object
        .keys(patients.value)
        .reduce((acc, key) => {

          acc[key] = {
            input: patients.value[key],
            output: quarantine.report()[key]
          }

          return acc
        }, {})

      resultsList.value.push(newResult)
      drugsList.value.push(currentDrugs.value.slice())

      if (resultsList.value.length > 10) {
        resultsList.value.shift()
        drugsList.value.shift()
      }

      totalTests.value++
      resultsLoaded.value = true

    } else {
      console.error(
        'Patients data is undefined. Cannot create Quarantine.'
      )
    }
  }
</script>

<template>
  <Title
    title="Hospital"
    sub="The Quarantine Simulation"
    :lvl="1"
  />

  <Button
    :action="loadData"
    label="Load the Patients & the Drugs"
  />

  <Patients
    v-if="patientsLoaded"
    :patients="patients"
  />

  <Drugs
    v-if="drugsLoaded"
    :drugs="drugs"
  />

  <Button
    v-if="patientsLoaded && drugsLoaded"
    :action="reportResults"
    label="Dispense the Drugs"
  />
  
  <Results
    v-if="resultsLoaded"
    :drugs="drugsList"
    :results="resultsList"
    :total="totalTests"
  />
</template>

<style scoped></style>
