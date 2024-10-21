/**
 * @interface Result
 *
 * @description
 *  The result of a simulation
 *
 * @property {string} key
 *  The state of the patient
 *
 * @property {number} input
 *  The number of patients in the input state
 *
 * @property {number} output
 *  The number of patients in the output state
 */
export interface Result {
  [key: string]: {
    input: number
    output: number
  }
}
