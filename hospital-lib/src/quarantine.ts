import { PatientsRegister } from './patientsRegister';
import { deadRules, treatmentRules } from './rules';

/**
 * @class
 * @name Quarantine
 * @description - Simulate disease on a group of patients
 */
export class Quarantine {

  //! ********** PROPERTIES **********

  /**
   * @property {PatientsRegister} patients
   * @description - The patient states register
   */
  private patients: PatientsRegister;

  /**
   * @property {PatientsRegister} newPatients
   * @description - The new patient states register
   */
  private newPatients: PatientsRegister;

  /**
   * @property {string[]} drugs
   * @description - The drugs that should be given to the patients
   */
  private drugs: string[];

  //! ********** CONSTRUCTOR **********

  /**
   * @constructor
   * @description - Create a new Quarantine with the given patients register
   * @param {PatientsRegister} patients - The patient states register
   */
  constructor(patients: PatientsRegister) {
    this.patients    = patients;
    this.newPatients = Object.keys(patients).reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
    this.drugs       = [];
  }

  //! ********** PRIVATE METHODS **********

  /**
   * @private
   * @method checkDeadRules
   * @description - Check if the given dead rule should be applied
   * @param {Object} rule - The dead rule to check
   * @param {function} rule.condition - The condition under which the rule should be applied
   * @param {function} rule.action - The action that should be taken if the condition is true
   * @returns {boolean} true if the rule has been applied, false otherwise
   */
  private checkDeadRules(rule: {condition: (drugs: string[]) => boolean; action: (patients: PatientsRegister, newPatients: PatientsRegister) => void}): boolean {

    if (rule.condition(this.drugs)) {
      rule.action(this.patients, this.newPatients);

      return true;
    }
    return false;
  }

  /**
   * @private
   * @method applyTreatmentRules
   * @description - Apply the treatment rules to the patients
   */
  private applyTreatmentRules() {
    for (const rule of treatmentRules) {

      if (rule.condition(this.drugs)) rule.valid(this.patients, this.newPatients);
      else rule.invalid(this.patients, this.newPatients);
    }
  }

  //! ********** PUBLIC METHODS **********

  /**
   * @method setDrugs
   * @description - Set the drugs that should be given to all the patients
   * @param {string[]} drugs - The drugs to give to the patients
   */
  public setDrugs(drugs: string[]): void {
    this.drugs = drugs;
  }

  /**
   * @method wait40Days
   * @description - Simulates what happens in the quarantine after 40 days
   */
  public wait40Days(): void {
    let patientsAreDead = false;

    // TODO: Test with mutiple deadRules like one true, then one false
    for (const rule of deadRules) patientsAreDead = this.checkDeadRules(rule);
    if (!patientsAreDead) this.applyTreatmentRules();

    this.patients = this.newPatients;
  }

  /**
   * @method report
   * @description - Return the current state of the patients
   * @returns {PatientsRegister} - The current state of the patients
   */
  public report(): PatientsRegister {

    return this.patients;
  }
}
