var d = Object.defineProperty;
var l = (i, n, e) => n in i ? d(i, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[n] = e;
var s = (i, n, e) => l(i, typeof n != "symbol" ? n + "" : n, e);
const a = [
  {
    condition: (i) => i.includes("As") && i.includes("P"),
    valid: (i, n) => n.X = i.F + i.H + i.D + i.T + i.X + i.P,
    // Pain state added here
    invalid: (i, n) => n.X = i.X
  },
  {
    condition: (i) => i.includes("As") && i.includes("Ib"),
    // Ibuprofen added here
    valid: (i, n) => n.X = i.F + i.H + i.D + i.T + i.X + i.P,
    // Pain state added here
    invalid: (i, n) => n.X = i.X
  }
], c = [
  {
    condition: (i) => i.includes("An") && i.includes("I"),
    valid: (i, n) => n.F += i.H,
    invalid: (i, n) => n.H += i.H
  },
  {
    condition: (i) => i.includes("As") || i.includes("P") || i.includes("Ib"),
    // Ibuprofen added here
    valid: (i, n) => n.H += i.F + i.P,
    // Pain state added here
    invalid: (i, n) => {
      n.F += i.F, n.P += i.P;
    }
    // Pain state added here
  },
  {
    condition: (i) => i.includes("An"),
    valid: (i, n) => n.H += i.T,
    invalid: (i, n) => n.T += i.T
  },
  {
    condition: (i) => !i.includes("I"),
    valid: (i, n) => n.X += i.D,
    invalid: (i, n) => n.D += i.D
  }
];
class u {
  //! ********** CONSTRUCTOR **********
  /**
   * @constructor
   *
   * @description
   *  Create a new Quarantine with the given patients register
   *
   * @param {PatientsRegister} patients
   *  The patient states register
   */
  constructor(n) {
    //! ********** PROPERTIES **********
    /**
     * @property {PatientsRegister} patients
     *
     * @description
     *  The patient states register
     */
    s(this, "patients");
    /**
     * @property {PatientsRegister} newPatients
     *
     * @description
     *  he new patient states register
     */
    s(this, "newPatients");
    /**
     * @property {string[]} drugs
     *
     * @description
     *  The drugs that should be given to the patients
     */
    s(this, "drugs");
    this.patients = n, this.newPatients = Object.keys(n).reduce((e, t) => ({ ...e, [t]: 0 }), {}), this.drugs = [];
  }
  //! ********** PRIVATE METHODS **********
  /**
   * @private
   *
   * @method checkDeadRules
   *
   * @description
   *  Check if the given dead rule should be applied
   *
   * @param {Object} rule
   *  The dead rule to check
   *
   * @param {function} rule.condition
   *  The condition under which the rule should be applied
   *
   * @param {function} rule.valid
   *  The action that should be taken if the condition is true
   *
   * @param {function} rule.invalid
   *  The action that should be taken if the condition is false
   *
   * @returns {boolean}
   *  True if the rule has been applied, false otherwise
   */
  checkDeadRules(n) {
    return n.condition(this.drugs) ? (n.valid(this.patients, this.newPatients), !0) : (n.invalid(this.patients, this.newPatients), !1);
  }
  /**
   * @private
   *
   * @method applyTreatmentRules
   *
   * @description
   *  Apply the treatment rules to the patients
   */
  applyTreatmentRules() {
    for (const n of c)
      n.condition(this.drugs) ? n.valid(this.patients, this.newPatients) : n.invalid(this.patients, this.newPatients);
  }
  //! ********** PUBLIC METHODS **********
  /**
   * @method setDrugs
   *
   * @description
   *  Set the drugs that should be given to all the patients
   *
   * @param {string[]} drugs
   *  The drugs to give to the patients
   */
  setDrugs(n) {
    this.drugs = n;
  }
  /**
   * @method wait40Days
   *
   * @description
   *  Simulates what happens in the quarantine after 40 days
   */
  wait40Days() {
    let n = !1;
    for (const e of a)
      n = n || this.checkDeadRules(e);
    n || this.applyTreatmentRules(), this.patients = this.newPatients;
  }
  /**
   * @method report
   *
   * @description
   *  Return the current state of the patients
   *
   * @returns {PatientsRegister}
   *  The current state of the patients
   */
  report() {
    return this.patients;
  }
}
export {
  u as Quarantine,
  a as deadRules,
  c as treatmentRules
};
