<script setup lang="ts">
  import { ref } from 'vue'
  import swal from 'sweetalert'
  import { PatientsRegister, Quarantine } from 'hospital-lib'
  import { Result } from './assets/Result'

  import {
    ERROR,
    EMPTY_INPUT_PATIENTS,
    SAME_INPUT_DATA,
    SAME_LOADED_DATA,
    UNDEFINED_DATA
  } from './assets/data'

  import {
    checkValidData,
    cleanArrayLength,
    cleanInput,
    cleanValue,
    formatPatients,
    formatResults,
    getData
  } from './assets/services'

  import Title from './components/atoms/Title.vue'
  import Button from './components/atoms/Button.vue'
  import Patients from './components/molecules/Patients.vue'
  import Drugs from './components/molecules/Drugs.vue'
  import Form from './components/molecules/Form.vue'
  import Results from './components/molecules/Results.vue'

  // ********** CONSTANTS **********

  const countedTests  = ref<number>(0)
  const inputPatients = ref<string>('')
  const inputDrugs    = ref<string>('')

  const isPatientsLoaded = ref<boolean>(false)
  const isDrugsLoaded    = ref<boolean>(false)
  const isResultsLoaded  = ref<boolean>(false)
  const isAutoUpdated    = ref<boolean>(false)
  const isFormShown      = ref<boolean>(false)

  const patients     = ref<PatientsRegister | undefined>({})
  const drugs        = ref<string | undefined>("")
  const drugsList    = ref<string[]>([])
  const results      = ref<Result[]>([])

  const previousPatients = ref(patients.value)
  const previousDrugs    = ref(drugs.value)

  // ********** LOADERS **********

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

    patients.value = formatPatients(data)
    isPatientsLoaded.value = true
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
    drugs.value = await getData('drugs')

    isDrugsLoaded.value = true
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

  // ********** RESULTS **********

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

    if (drugs.value) {
      drugsList.value.push(drugs.value.slice())
    } else {
      drugsList.value.push('')
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
      const isSameDrugs:  boolean   = previousDrugs.value === drugs.value

      if (!isSamePatients || !isSameDrugs) {
        const quarantine = new Quarantine(patients.value)

        quarantine.setDrugs((drugs.value ?? '')?.split(','))
        quarantine.wait40Days()

        const newResult: Result = formatResults(patients.value, quarantine.report())

        updateResults(newResult)
        cleanArrayLength(results.value, drugsList.value)

        countedTests.value++
        isResultsLoaded.value = true

        previousPatients.value = patients.value
        previousDrugs.value    = drugs.value

      } else {
        swal(ERROR, SAME_LOADED_DATA, "error")
      }

    } else {
      swal(ERROR, UNDEFINED_DATA, "error")
    }
  }

  // ********** AUTO UPDATE **********

  /**
   * @method autoUpdateResults
   *
   * @description
   *  Auto update the results
   *
   * @returns {Promise<void>}
   */
  const autoUpdateResults = async () : Promise<void> => {
    if (isAutoUpdated.value) {

      await loadData()
      await reportResults()
      await new Promise(resolve => setTimeout(resolve, 30000))

      autoUpdateResults()
    }
  }

  // ********** MANUAL INPUT **********

  /**
   * @method validManualInput
   *
   * @description
   *  Validate the manual input
   *
   * @returns {Promise<void>}
   */
  const validManualInput = async (): Promise<void> => {
    patients.value = formatPatients(inputPatients.value)
    drugs.value    = inputDrugs.value

    await reportResults()
  }

  /**
   * @method checkSameManualInput
   *
   * @description
   *  Check if the manual input is the same as the previous one
   *
   * @returns {void}
   */
  const checkSameManualInput = () : void => {
    const formatPreviousPatients: string = JSON.stringify(previousPatients.value)
    const formatManualPatients: string   = JSON.stringify(formatPatients(inputPatients.value))

    const isSamePatients: boolean = formatPreviousPatients === formatManualPatients
    const isSameDrugs: boolean    = previousDrugs.value === inputDrugs.value

    if (!isSamePatients || !isSameDrugs) validManualInput()
    else swal(ERROR, SAME_INPUT_DATA, "error")
  }

  /**
   * @method handleSubmitManualInput
   *
   * @description
   *  Handle the manual input
   *
   * @returns {Promise<void>}
   */
  const handleManualInput = async () : Promise<void> => {

    if (inputPatients.value) {
      inputPatients.value = cleanValue(inputPatients.value)
      inputDrugs.value    = cleanInput(inputDrugs.value)

      if (checkValidData(inputPatients.value, inputDrugs.value)) {
        checkSameManualInput()
      }

    } else {
      swal(ERROR, EMPTY_INPUT_PATIENTS, "error")
    }
  }

  // ********** TOGGLER **********

  /**
   * @method toggle
   *
   * @description
   *  Toggle the form or the auto update
   *
   * @param {string} type
   *  The type of the element
   *
   * @returns {void}
   */
  const toggle = (type: 'form' | 'autoUpdate') : void => {

  if (type === 'form') {
    isFormShown.value = !isFormShown.value

  } else if (type === 'autoUpdate') {
    isAutoUpdated.value = !isAutoUpdated.value
    autoUpdateResults()
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

  <header>
    <Button
      :action="loadData"
      icon="fa-solid fa-file-medical"
      label="Load Data"
    />

    <Button
      v-if="isPatientsLoaded && isDrugsLoaded"
      :action="reportResults"
      icon="fa-solid fa-user-nurse"
      label="Dispense Drugs"
    />

    <Button
      :action="() => toggle('autoUpdate')"
      :class="isAutoUpdated ? 'active' : ''"
      :icon="isAutoUpdated ? 'fa-solid fa-sync fa-spin' : 'fa-solid fa-sync'"
      label="Auto Refresh"
    />

    <Button
      :action="() => toggle('form')"
      :class="isFormShown ? 'active' : ''"
      :icon="isFormShown ? 'fa-regular fa-pen-to-square' : 'fa-solid fa-pen-to-square'"
      label="Manual Input"
    />
  </header>

  <Patients
    v-if="isPatientsLoaded && !isFormShown"
    :patients="patients"
  />

  <Drugs
    v-if="isDrugsLoaded && !isFormShown"
    :drugs="drugs"
  />

  <Form
    v-if="isFormShown"
    :handleSubmitManualInput="handleManualInput"
    :inputPatients="inputPatients"
    :inputDrugs="inputDrugs"
    @update:inputPatients="inputPatients = $event"
    @update:inputDrugs="inputDrugs = $event"
  />

  <Results
    v-if="isResultsLoaded"
    :drugs="drugsList"
    :results="results"
    :total="countedTests"
  />
</template>

<style scoped>
  header {
    display: flex;
    flex-flow: column;
    place-items: center;

    @media (min-width: 576px) {
      flex-flow: row wrap;
      place-content: center;
    }
  }
</style>