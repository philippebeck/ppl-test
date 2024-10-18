import { PatientsRegister as PR } from './patientsRegister';

/**
 * @constant deadRules
 * @type {Array<{
 *  condition: (drugs: string[]) => boolean;
 *  valid: (patients: PR, newPatients: PR) => void
 *  invalid: (patients: PR, newPatients: PR) => void
 * }>}
 * @description - Dead rules
 *  - If the patients have Aspirin & Paracetamol, they will die
 */
export const deadRules: Array<{
  condition: (drugs: string[]) => boolean;
  valid: (patients: PR, newPatients: PR) => void;
  invalid: (patients: PR, newPatients: PR) => void
}> = [
  {
    condition: (drugs: string[]) => drugs.includes('As') && drugs.includes('P'),
    valid: (patients: PR, newPatients: PR) => newPatients.X += patients.F + patients.H + patients.D + patients.T + patients.X,
    invalid: (patients: PR, newPatients: PR) => newPatients.X += patients.X
  }
];

/**
 * @constant treatmentRules
 * @type {Array<{
 *  condition: (drugs: string[]) => boolean;
 *  valid: (patients: PR, newPatients: PR) => void;
 *  invalid: (patients: PR, newPatients: PR) => void
 * }>}
 * @description - Treatment rules
 *  - If healthy patients have Antibiotic & Insulin, they will have a fever
 *  - If feverish patients have Aspirin or Paracetamol, the fever will be cured
 *  - If tuberculosis patients have Antibiotic, the tuberculosis will be cured
 *  - If diabetic patients have not Insulin, they will die
 */
export const treatmentRules: Array<{
  condition: (drugs: string[]) => boolean;
  valid: (patients: PR, newPatients: PR) => void;
  invalid: (patients: PR, newPatients: PR) => void
}> = [
  {
    condition: (drugs: string[]) => drugs.includes('An') && drugs.includes('I'),
    valid: (patients: PR, newPatients: PR) => newPatients.F += patients.H,
    invalid: (patients: PR, newPatients: PR) => newPatients.H += patients.H
  },
  {
    condition: (drugs: string[]) => drugs.includes('As') || drugs.includes('P'),
    valid: (patients: PR, newPatients: PR) => newPatients.H += patients.F,
    invalid: (patients: PR, newPatients: PR) => newPatients.F += patients.F
  },
  {
    condition: (drugs: string[]) => drugs.includes('An'),
    valid: (patients: PR, newPatients: PR) => newPatients.H += patients.T,
    invalid: (patients: PR, newPatients: PR) => newPatients.T += patients.T
  },
  {
    condition: (drugs: string[]) => !drugs.includes('I'),
    valid: (patients: PR, newPatients: PR) => newPatients.X += patients.D,
    invalid: (patients: PR, newPatients: PR) => newPatients.D += patients.D
  }
];
