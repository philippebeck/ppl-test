import { PatientsRegister as PR } from './patientsRegister';
/**
 * @constant deadRules
 * @type {Array<{
 *  condition: (drugs: string[]) => boolean;
 *  action: (patients: PR, newPatients: PR) => void
 * }>}
 * @description - Dead rules
 *  - If the patients have Aspirin & Paracetamol, they will die
 */
export declare const deadRules: Array<{
    condition: (drugs: string[]) => boolean;
    action: (patients: PR, newPatients: PR) => void;
}>;
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
export declare const treatmentRules: Array<{
    condition: (drugs: string[]) => boolean;
    valid: (patients: PR, newPatients: PR) => void;
    invalid: (patients: PR, newPatients: PR) => void;
}>;
