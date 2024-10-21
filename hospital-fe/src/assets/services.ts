import axios from 'axios'
import { Result } from './Result'

/**
 * @method sanitizeInput
 * 
 * @description
 *  Check if the input value is valid
 *
 * @param {string} input
 *  The input to check
 *
 * @returns {string}
 *  The sanitized input
 */
export const sanitizeInput = (input: string): string => {

  if (input) input = cleanValue(input)
  else input = ''

  return input
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
 * @function getData
 *
 * @description
 *  Make a GET request to the given endpoint & return the response data
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

/**
 * @method isIncluded
 *
 * @description
 *  Return if the string is included in the array
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
export const isIncluded = (string: string, array: string[]) : boolean => {

  return array.includes(string)
}

/**
 * @method isValidData
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
export const isValidData = (
  patients: string,
  drugs: string
): boolean => {

  const patientsArray: string[] = patients.split(',')
  const drugsArray: string[]    = drugs.split(',')

  if (!patientsArray.every(patient => isIncluded(patient, patientBase))) {
    alert(INVALID_PATIENTS)

    return false
  }

  if (!drugsArray.every(drug => isIncluded(drug, drugBase))) {
    alert(INVALID_DRUGS)

    return false
  }

  return true
}

/**
 * @function truncateData
 *
 * @description
 *  Truncate the data to the given length
 *
 * @param {Result[]} primary
 *  The primary data to truncate
 *
 * @param {string[]} secondary
 *  The secondary data to truncate
 *  @default []
 *
 * @param {number} length
 *  The length to truncate the data to
 *  @default 10
 *
 * @returns {void}
 */
export const truncateData = (
  result: Result[] ,
  array: string[] = [],
  length: number = 10
) : void => {

  if (result.length > length) result.shift()
  if (array.length > 0 && array.length > length) array.shift()
}

}
