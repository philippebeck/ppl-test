import { PatientsRegister } from './patientsRegister';

/**
 * @class
 * @name Quarantine
 * @description - Simulate disease on a group of patients
 */
export class Quarantine {

  /**
   * @property {PatientsRegister} patients
   * @description - The patient states register
   */
  private patients: PatientsRegister;

  /**
   * @property {string[]} drugs
   * @description - The drugs that should be given to the patients
   */
  private drugs: string[];

  /**
   * @constructor
   * @description - Create a new Quarantine with the given patients register
   * @param {PatientsRegister} patients - The patient states register
   *  The patient states are as follows:
   *  - F : fever
   *  - H : healthy
   *  - D : diabetic
   *  - T : tuberculosis
   *  - X : dead
   */
  constructor(patients: PatientsRegister) {
    this.patients = patients;
    this.drugs    = [];
  }

  /**
   * @method setDrugs
   * @description - Set the drugs that should be given to all the patients
   * @param {string[]} drugs - The drugs to give to the patients
   *  The drugs are as follows:
   *  - An : Antibiotic
   *  - As : Aspirin
   *  - I  : Insulin
   *  - P  : Paracetamol
   */
  public setDrugs(drugs: string[]): void {
    this.drugs = drugs;
  }

  /**
   * @method wait40Days
   * @description - Simulates what happens in the quarantine after 40 days
   *  The rules are as follows:
   *  - If a patient has aspirin & paracetamol, he will die
   *  - If a healthy patient has antibiotics & insulin, the patient will have a fever
   *  - If a feverish patient has aspirin or paracetamol, the fever will be cured
   *  - If a tuberculosis patient has antibiotics, the tuberculosis will be cured
   *  - If a diabetic patient does not have insulin, he will die
   *  Then the results are stored in the quarantine patients register
   */
  public wait40Days(): void {
    const HAS_ANTIBIOTIC: boolean  = this.drugs.includes('An');
    const HAS_ASPIRIN: boolean     = this.drugs.includes('As');
    const HAS_INSULIN: boolean     = this.drugs.includes('I');
    const HAS_PARACETAMOL: boolean = this.drugs.includes('P');

    let {F, H, D, T}: PatientsRegister = this.patients;
    let newPatients: PatientsRegister  = { F: 0, H: 0, D: 0, T: 0, X: 0 };

    if (HAS_ASPIRIN && HAS_PARACETAMOL) {
      newPatients.X += F + H + D + T;

    } else {

      if (HAS_ANTIBIOTIC && HAS_INSULIN) newPatients.F += H;
      else newPatients.H += H;

      if (HAS_ASPIRIN || HAS_PARACETAMOL) newPatients.H += F;
      else newPatients.F += F;

      if (HAS_ANTIBIOTIC) newPatients.H += T;
      else newPatients.T += T;

      if (!HAS_INSULIN) newPatients.X += D;
      else newPatients.D += D;
    }

    this.patients = newPatients;
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
