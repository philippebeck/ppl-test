import axios from 'axios'
import { Result } from './Result'

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
  primary: Result[] ,
  secondary: string[] = [],
  length: number = 10
) : void => {

  if (primary.length > length) {
    primary.shift()

    if (secondary.length > 0) secondary.shift()
  }
}
