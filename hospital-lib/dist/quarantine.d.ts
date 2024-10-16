import { PatientsRegister } from './patientsRegister';
/**
 * @class
 * @name Quarantine
 * @description - Simulate disease on a group of patients
 */
export declare class Quarantine {
    /**
     * @property {PatientsRegister} patients
     * @description - The patient states register
     */
    private patients;
    /**
     * @property {PatientsRegister} newPatients
     * @description - The new patient states register
     */
    private newPatients;
    /**
     * @property {string[]} drugs
     * @description - The drugs that should be given to the patients
     */
    private drugs;
    /**
     * @constructor
     * @description - Create a new Quarantine with the given patients register
     * @param {PatientsRegister} patients - The patient states register
     */
    constructor(patients: PatientsRegister);
    /**
     * @private
     * @method checkDeadRules
     * @description - Check if the given dead rule should be applied
     * @param {Object} rule - The dead rule to check
     * @param {function} rule.condition - The condition under which the rule should be applied
     * @param {function} rule.action - The action that should be taken if the condition is true
     * @returns {boolean} true if the rule has been applied, false otherwise
     */
    private checkDeadRules;
    /**
     * @private
     * @method applyTreatmentRules
     * @description - Apply the treatment rules to the patients
     */
    private applyTreatmentRules;
    /**
     * @method setDrugs
     * @description - Set the drugs that should be given to all the patients
     * @param {string[]} drugs - The drugs to give to the patients
     */
    setDrugs(drugs: string[]): void;
    /**
     * @method wait40Days
     * @description - Simulates what happens in the quarantine after 40 days
     */
    wait40Days(): void;
    /**
     * @method report
     * @description - Return the current state of the patients
     * @returns {PatientsRegister} - The current state of the patients
     */
    report(): PatientsRegister;
}
