<script setup lang="ts">
  import { ref } from 'vue'
  import { PatientsRegister } from 'hospital-lib'
  // TODO: import the Quarantine class from the package
  import { Quarantine } from 'hospital-lib/src/quarantine'
  import { Result } from './assets/Result'
  import { patientBase, initPatientBase, drugBase } from './assets/data'
  import { cleanValue, getData, truncateData } from './assets/services'

  import Title from './components/atoms/Title.vue'
  import Button from './components/atoms/Button.vue'
  import Patients from './components/molecules/Patients.vue'
  import Drugs from './components/molecules/Drugs.vue'
  import Form from './components/molecules/Form.vue'
  import Results from './components/molecules/Results.vue'

  const totalTests     = ref<number>(0)
  const manualPatients = ref<string>('')
  const manualDrugs    = ref<string>('')

  const patientsLoaded = ref<boolean>(false)
  const drugsLoaded    = ref<boolean>(false)
  const resultsLoaded  = ref<boolean>(false)
  const autoUpdate     = ref<boolean>(false)
  const showForm       = ref<boolean>(false)

  const patients     = ref<PatientsRegister | undefined>({})
  const drugs        = ref<string | undefined>("")
  const drugsList    = ref<string[]>([])
  const results      = ref<Result[]>([])

  const previousPatients = ref(patients.value)
  const previousDrugs    = ref(drugs.value)

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
        const defaultState: PatientsRegister = initPatientBase
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
    drugs.value = await getData('drugs')

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

        const newResult: Result = formatNewResult(patients.value, quarantine.report())

        updateResults(newResult)
        truncateData(results.value, drugsList.value)

        totalTests.value++
        resultsLoaded.value = true

        previousPatients.value = patients.value
        previousDrugs.value    = drugs.value

      } else {
        alert(
          'Patients & drugs are the same: please load new data.'
        )
      }

    } else {
      alert(
        'Patients data is undefined, cannot create Quarantine.'
      )
    }
  }

  /**
   * @method toggleAutoUpdate
   *
   * @description
   *  Toggle the auto update
   *
   * @returns {void}
   */
  const toggleAutoUpdate = () : void => {
    autoUpdate.value = !autoUpdate.value
    autoUpdateResults()
  }

  /**
   * @method autoUpdateResults
   *
   * @description
   *  Auto update the results
   *
   * @returns {Promise<void>}
   */
  const autoUpdateResults = async () : Promise<void> => {
    if (autoUpdate.value) {

      await loadData()
      await reportResults()
      await new Promise(resolve => setTimeout(resolve, 30000))

      autoUpdateResults()
    }
  }

  /**
   * @method toggleForm
   *
   * @description
   *  Toggle the form
   *
   * @returns {void}
   */
  const toggleForm = () : void => {
    showForm.value = !showForm.value
  }

/**
 * @method checkManualDrugs
 * 
 * @description
 *  Check if the manual drugs are valid
 * 
 * @returns {void}
 */
  const checkManualDrugs = () : void => {
    if (manualDrugs.value) {
      manualDrugs.value = cleanValue(manualDrugs.value)
    } else {
      manualDrugs.value = ''
    }
  }

  /**
   * @method isValidPatient
   *
   * @description
   *  Check if the patient is valid
   *
   * @param {string} patient
   *  The patient to check
   *
   * @returns {boolean}
   *  True if the patient is valid, false otherwise
   */
  const isValidPatient = (patient: string) : boolean => {

    return patientBase.includes(patient)
  }

  /**
   * @method isValidDrug
   *
   * @description
   *  Check if the drug is valid
   *
   * @param {string} drug
   *  The drug to check
   *
   * @returns {boolean}
   *  True if the drug is valid, false otherwise
   */
  const isValidDrug = (drug: string) : boolean => {

    return drugBase.includes(drug)
  }

  /**
   * @method isValidData
   *
   * @description
   *  Check if the data is valid
   *
   * @returns {boolean}
   *  True if the data is valid, false otherwise
   */
  const isValidData = () : boolean => {
    const patientsArray: string[] = manualPatients.value.split(',')
    const drugsArray: string[]    = manualDrugs.value.split(',')

    if (!patientsArray.every(isValidPatient)) {
      alert('Error: one or more patients are invalid.')

      return false
    }

    if (!drugsArray.every(isValidDrug)) {
      alert('Error: one or more drugs are invalid.')

      return false
    }

    return true
  }

  /**
   * @method validManualInput
   *
   * @description
   *  Validate the manual input
   *
   * @returns {Promise<void>}
   */
  const validManualInput = async (): Promise<void> => {
    patients.value = formatPatientsData(manualPatients.value)
    drugs.value    = manualDrugs.value

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
    const formatManualPatients: string   = JSON.stringify(formatPatientsData(manualPatients.value))

    const isSamePatients: boolean = formatPreviousPatients === formatManualPatients
    const isSameDrugs: boolean    = previousDrugs.value === manualDrugs.value

    if (!isSamePatients || !isSameDrugs) validManualInput()
    else alert('Patients & drugs are the same: please type new data.')
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

    if (manualPatients.value) {
      manualPatients.value = cleanValue(manualPatients.value)

      checkManualDrugs()

      if (isValidData()) checkSameManualInput()

    } else {
      alert('Error: please type patients.')
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
      v-if="patientsLoaded && drugsLoaded"
      :action="reportResults"
      icon="fa-solid fa-user-nurse"
      label="Dispense Drugs"
    />

    <Button
      :action="toggleAutoUpdate"
      :icon="autoUpdate ? 'fa-solid fa-sync fa-spin active' : 'fa-solid fa-sync'"
      label="Auto Refresh"
    />

    <Button
      :action="toggleForm"
      :icon="showForm ? 'fa-solid fa-pen-to-square active' : 'fa-solid fa-pen-to-square'"
      label="Manual Input"
    />
  </header>

  <Patients
    v-if="patientsLoaded && !showForm"
    :patients="patients"
  />

  <Drugs
    v-if="drugsLoaded && !showForm"
    :drugs="drugs"
  />

  <Form
    v-if="showForm"
    :handleSubmitManualInput="handleManualInput"
    :manualPatients="manualPatients"
    :manualDrugs="manualDrugs"
    @update:manualPatients="manualPatients = $event"
    @update:manualDrugs="manualDrugs = $event"
  />

  <Results
    v-if="resultsLoaded"
    :drugs="drugsList"
    :results="results"
    :total="totalTests"
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