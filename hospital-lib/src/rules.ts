import { PatientsRegister as PR } from './patientsRegister';

/**
 * @constant deadRules
 * @type {Array<{
 *  condition: (drugs: string[]) => boolean;
 *  valid: (patients: PR, newPatients: PR) => void;
 *  invalid: (patients: PR, newPatients: PR) => void
 * }>}
 * @description - Dead rules
 *  - If the patients have Aspirin & Paracetamol, they will die
 * * (additional test to check the logic flexibility)
 * * - If the patients have Aspirin & Ibuprofen, they will die
 */
export const deadRules: Array<{
  condition: (drugs: string[]) => boolean;
  valid: (patients: PR, newPatients: PR) => void
  invalid: (patients: PR, newPatients: PR) => void
}> = [
  {
    condition: (drugs: string[]) => drugs.includes('As') && drugs.includes('P'),
    valid: (patients: PR, newPatients: PR) => newPatients.X = patients.F + patients.H + patients.D + patients.T + patients.X + patients.P, // Pain state added here
    invalid: (patients: PR, newPatients: PR) => newPatients.X = patients.X
  },
  {
    condition: (drugs: string[]) => drugs.includes('As') && drugs.includes('Ib'), // Ibuprofen added here
    valid: (patients: PR, newPatients: PR) => newPatients.X = patients.F + patients.H + patients.D + patients.T + patients.X + patients.P, // Pain state added here
    invalid: (patients: PR, newPatients: PR) => newPatients.X = patients.X
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
 * * (modified test to check the logic flexibility)
 * * - If feverish patients have Aspirin or Ibuprofen or Paracetamol, the fever will be cured
 * * - If painful patients have Aspirin or Ibuprofen or Paracetamol, the pain will be cured
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
    condition: (drugs: string[]) => drugs.includes('As') || drugs.includes('P') || drugs.includes('Ib'), // Ibuprofen added here
    valid: (patients: PR, newPatients: PR) => newPatients.H += patients.F + patients.P, // Pain state added here
    invalid: (patients: PR, newPatients: PR) => { newPatients.F += patients.F; newPatients.P += patients.P } // Pain state added here
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
