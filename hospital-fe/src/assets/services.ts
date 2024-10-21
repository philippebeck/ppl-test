import axios from 'axios'
import swal from 'sweetalert'
import { PatientsRegister } from 'hospital-lib'
import { Result } from './Result'

import {
  ERROR,
  INVALID_DRUGS,
  INVALID_PATIENTS,
  drugBase,
  initPatientBase,
  patientBase
} from './data'

//! ********** CHECKERS **********

/**
 * @function checkArray
 *
 * @description
 *  Return true if the string is included in the array
 *
 * @param {string} string
 *  The string to check
 *
 * @param {string[]} array
 *  The array to check the string in
 *
 * @returns {boolean}
 *  True if the string is included in the array, false otherwise
 */
export const checkArray = (
  string: string,
  array: string[]
) : boolean => {

  return array.includes(string)
}

/**
 * @function checkValidData
 *
 * @description
 *  Check if the data is valid
 *
 * @param {string} patients
 *  The patients data
 *
 * @param {string} drugs
 *  The drugs data
 *
 * @returns {boolean}
 *  True if the data is valid, false otherwise
 */
export const checkValidData = (
  patients: string,
  drugs: string
): boolean => {

  const patientsArray: string[] = patients.split(',')
  const drugsArray: string[]    = drugs.split(',')

  if (!patientsArray.every(patient => checkArray(patient, patientBase))) {
    swal(ERROR, INVALID_PATIENTS, "error")

    return false
  }

  if (!drugsArray.every(drug => checkArray(drug, drugBase))) {
    swal(ERROR, INVALID_DRUGS, "error")

    return false
  }

  return true
}

//! ********** CLEANERS **********

/**
 * @function cleanArrayLength
 *
 * @description
 *  Truncate the array to the given length
 *
 * @param {Result[]} result
 *  The result data to truncate
 *
 * @param {string[]} array
 *  The array data to truncate
 *  @default []
 *
 * @param {number} length
 *  The length to truncate the data to
 *  @default 10
 *
 * @returns {void}
 */
export const cleanArrayLength = (
  result: Result[] ,
  array: string[] = [],
  length: number = 10
) : void => {

  if (result.length > length) result.shift()
  if (array.length > 0 && array.length > length) array.shift()
}

/**
 * @function cleanValue
 *
 * @description
 *  Clean the value
 *
 * @param {string} value
 *  The value to clean
 *
 * @returns {string}
 *  The cleaned value
 */
export const cleanValue = (value: string) : string => {

  return value.trim().replace(/\s*,\s*/g, ',')
}

/**
 * @function cleanInput
 * 
 * @description
 *  Clean the input
 *
 * @param {string} input
 *  The input to clean
 *
 * @returns {string}
 *  The cleaned input
 */
export const cleanInput = (input: string): string => {

  if (input) input = cleanValue(input)
  else input = ''

  return input
}

//! ********** FORMATTERS **********

/**
 * @function formatPatients
 *
 * @description
 *  Parses a string of patient states & counts occurrences of each state
 *
 * @param {string | undefined} patients
 *  A comma-separated string representing patient states
 *
 * @returns {Object}
 *  An object with the counts of each state, initialized with default values
 */
export const formatPatients = (
  patients: string | undefined
): PatientsRegister | undefined => {

  return patients
    ?.split(',')
    .reduce((acc: PatientsRegister, current: string) => {
      const defaultState: PatientsRegister = initPatientBase
      acc = { ...defaultState, ...acc }
      acc[current] = (acc[current] || 0) + 1

      return acc
    }, {})
}

/**
 * @function formatResults
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
 *  An object with each key being a patient state
 *  and each value being an object with input & output properties,
 *  which are the counts of the state in the input
 *  and output states, respectively
 */
export const formatResults = (
  input: PatientsRegister,
  output: PatientsRegister
) : Result => {

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

//! ********** GETTER **********

/**
 * @function getData
 *
 * @description
 *  Make a GET request to the given endpoint
 *  and return the response data
 *
 * @param {string} endpoint
 *  The endpoint to make the request to
 *
 * @param {string} path
 *  The path to make the request to
 *  @default 'http://localhost:7200/'
 *
 * @returns {Promise<string | undefined>}
 *  The response data of the request
 */
export const getData = async (
  endpoint: string,
  path: string = 'http://localhost:7200/'
) : Promise<string | undefined> => {

  const URL: string = path + endpoint

  try {
    const response: { data: string } = await axios.get<string>(URL)

    return response.data

  } catch (error) {
    console.error(error)
  }
}
