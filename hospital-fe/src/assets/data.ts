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

export const EMPTY_INPUT_PATIENTS: string =
  'Error: please type patients.'

export const INVALID_DRUGS: string =
  'Error: one or more drugs are invalid.'

export const INVALID_PATIENTS: string =
  'Error: one or more patients are invalid.'

export const SAME_INPUT_DATA: string =
  'Patients & drugs are the same: please type new data.'

export const SAME_LOADED_DATA: string =
  'Patients & drugs are the same: please load new data.'

export const UNDEFINED_DATA: string =
  'Patients data is undefined, cannot create Quarantine.'
