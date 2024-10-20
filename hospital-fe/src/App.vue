<script setup lang="ts">
  import { ref } from 'vue'
  import { PatientsRegister } from 'hospital-lib'
  // TODO: import the Quarantine class from the dist folder
  import { Quarantine } from 'hospital-lib/src/quarantine'

  import { Result } from './Result'
  import { getData, truncateData } from './services'

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
  const currentDrugs = ref<string | undefined>("")
  const drugsList    = ref<string[]>([])
  const results      = ref<Result[]>([])

  const previousPatients = ref(patients.value)
  const previousDrugs    = ref(currentDrugs.value)

  /**
   * @method formatPatientsData
   *
   * @description
   *  Parses a string of patient states & counts occurrences of each state
   *
   * @param {string | undefined} data
   *  A comma-separated string representing patient states
   *
   * @returns {Object}
   *  An object with the counts of each state, initialized with default values
   */
  const formatPatientsData = (data: string | undefined): PatientsRegister | undefined => {

    return data
      ?.split(',')
      .reduce((acc: PatientsRegister, current: string) => {
        const defaultState: PatientsRegister = { F: 0, H: 0, D: 0, T: 0, X: 0 }
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
  const loadPatients = async () : Promise<void> => {
    const data: string | undefined = await getData("patients")

    patients.value = formatPatientsData(data)
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
  const loadDrugs = async () : Promise<void> => {
    const data: string | undefined = await getData('drugs')

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
  const loadData = async () : Promise<void> => {
    await loadPatients()
    await loadDrugs()
  }

  /**
   * @method formatNewResult
   *
   * @description
   *  Format the results of a quarantine simulation
   *
   * @param {PatientsRegister} input
   *  The input states of the patients
   *
   * @param {PatientsRegister} output
   *  The output states of the patients
   *
   * @returns {Result}
   *  An object with each key being a patient state & each value being an object with
   *  input & output properties, which are the counts of the state in the input &
   *  output states, respectively
   */
  const formatNewResult = (input: PatientsRegister, output: PatientsRegister) : Result => {

    return Object
      .keys(input)
      .reduce((acc: Result, key: string) => {
        acc[key] = {
          input: input[key],
          output: output[key]
        }

        return acc
      }, {})
  }

  /**
   * @method updateResults
   *
   * @description
   *  Add the result to the results list
   *
   * @param {Result} newResult
   *  The result to add
   */
  const updateResults = (newResult: Result) : void => {
    results.value.push(newResult)

    if (currentDrugs.value) {
      drugsList.value.push(currentDrugs.value.slice())
    }
  }

  /**
   * @method reportResults
   *
   * @description
   *  Simulate a quarantine, add the result to the results list and update the UI
   *
   * @returns {Promise<void>}
   */
  const reportResults = async () : Promise<void> => {
    if (patients.value) {

      const isSamePatients: boolean = previousPatients.value === patients.value
      const isSameDrugs:  boolean   = previousDrugs.value === currentDrugs.value

      if (!isSamePatients || !isSameDrugs) {
        const quarantine = new Quarantine(patients.value)

        quarantine.setDrugs((currentDrugs.value ?? '')?.split(','))
        quarantine.wait40Days()

        const newResult: Result = formatNewResult(patients.value, quarantine.report())

        updateResults(newResult)
        truncateData(results.value, drugsList.value)

        totalTests.value++
        resultsLoaded.value = true

        previousPatients.value = patients.value
        previousDrugs.value    = currentDrugs.value

      } else {
        alert(
          'Patients & drugs are the same, cannot create Quarantine: please load new data.'
        )
      }

    } else {
      alert(
        'Patients data is undefined, cannot create Quarantine.'
      )
    }
  }
</script>

<template>
  <Title
    icon="fa-regular fa-hospital"
    title="Hospital"
    sub="The Quarantine Simulation"
    :lvl="1"
  />

  <Button
    :action="loadData"
    icon="fa-solid fa-file-medical"
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
    icon="fa-solid fa-user-nurse"
    label="Dispense the Drugs"
  />
  
  <Results
    v-if="resultsLoaded"
    :drugs="drugsList"
    :results="results"
    :total="totalTests"
  />
</template>

<style scoped></style>
