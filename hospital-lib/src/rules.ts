import { PatientsRegister } from './patientsRegister';

/**
 * @function
 * @name deadRules
 * @description - Dead rules
 * @type {Array<{condition: (drugs: string[]) => boolean; action: (patients: PatientsRegister, newPatients: PatientsRegister) => void }>}
 */
export const deadRules: Array<{ condition: (drugs: string[]) => boolean; action: (patients: PatientsRegister, newPatients: PatientsRegister) => void }> = [
  {
    condition: (drugs: string[]) => drugs.includes('As') && drugs.includes('P'),
    action: (patients: PatientsRegister, newPatients: PatientsRegister) => newPatients.X += patients.F + patients.H + patients.D + patients.T
  }
];

/**
 * @function
 * @name treatmentRules
 * @description - Treatment rules
 * @type {Array<{condition: (drugs: string[]) => boolean; valid: (patients: PatientsRegister, newPatients: PatientsRegister) => void; invalid: (patients: PatientsRegister, newPatients: PatientsRegister) => void }>}
 */
export const treatmentRules: Array<{ condition: (drugs: string[]) => boolean; valid: (patients: PatientsRegister, newPatients: PatientsRegister) => void; invalid: (patients: PatientsRegister, newPatients: PatientsRegister) => void }> = [
  {
    condition: (drugs: string[]) => drugs.includes('An') && drugs.includes('I'),
    valid: (patients: PatientsRegister, newPatients: PatientsRegister) => newPatients.F += patients.H,
    invalid: (patients: PatientsRegister, newPatients: PatientsRegister) => newPatients.H += patients.H
  },
  {
    condition: (drugs: string[]) => drugs.includes('As') || drugs.includes('P'),
    valid: (patients: PatientsRegister, newPatients: PatientsRegister) => newPatients.H += patients.F,
    invalid: (patients: PatientsRegister, newPatients: PatientsRegister) => newPatients.F += patients.F
  },
  {
    condition: (drugs: string[]) => drugs.includes('An'),
    valid: (patients: PatientsRegister, newPatients: PatientsRegister) => newPatients.H += patients.T,
    invalid: (patients: PatientsRegister, newPatients: PatientsRegister) => newPatients.T += patients.T
  },
  {
    condition: (drugs: string[]) => !drugs.includes('I'),
    valid: (patients: PatientsRegister, newPatients: PatientsRegister) => newPatients.X += patients.D,
    invalid: (patients: PatientsRegister, newPatients: PatientsRegister) => newPatients.D += patients.D
  }
];
