//! ********** BASES **********

export const drugBase: string[] = [
  '',
  'An',
  'As',
  'I',
  'P'
]

export const initPatientBase: {
  F: number,
  H: number,
  D: number,
  T: number,
  X: number
} = {
  F: 0,
  H: 0,
  D: 0,
  T: 0,
  X: 0
}

export const patientBase: string[] = [
  'F',
  'H',
  'D',
  'T',
  'X'
]

//! ********** MESSAGES **********

export const ERROR: string =
  'Oops !'

export const EMPTY_INPUT_PATIENTS: string =
  'No patients data: Please type patients.'

export const INVALID_DRUGS: string =
  'One or more drugs are invalid: Please type valid drugs.'

export const INVALID_PATIENTS: string =
  'One or more patients are invalid: Please type valid patients.'

export const SAME_INPUT_DATA: string =
  'Patients & drugs are the same: Please type new data.'

export const SAME_LOADED_DATA: string =
  'Patients & drugs are the same: Please load new data.'

export const UNDEFINED_DATA: string =
  'Patients data is undefined: Cannot create Quarantine.'
