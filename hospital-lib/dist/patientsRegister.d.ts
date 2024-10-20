/**
 * @interface PatientsRegister
 *
 * @description
 *  The patient states register
 *
 * @property {string} key
 *  The state of the patient
 *
 * @property {number} value
 *  The number of patients in the state
 */
export interface PatientsRegister {
    [key: string]: number;
}
