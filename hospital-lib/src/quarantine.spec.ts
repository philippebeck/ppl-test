import {Expect, Setup, Test, TestFixture} from 'alsatian';
import {Quarantine} from './quarantine';

@TestFixture()
/**
 * @class
 * @name QuarantineTest
 * @description - Test the Quarantine class
 */
export class QuarantineTest {

  /**
   * @property quarantine
   * @description - The Quarantine object
   */
  private quarantine: Quarantine;

  @Setup
  /**
   * @method setup
   * @description - Initialize the quarantine with a patient list where there is one of each disease
   *  The responsibility of the Quarantine object is to simulate diseases on a group of patients
   *  It is initialized with a list of patients health status, separated by a comma
   *  Each health status is described by one or more characters
   *  (in the test below, we will always have only one disease / patient)
   *
   *  The characters mean:
   *  - F : Fever
   * * - P : Painly (adding state to check the logic flexibility)
   *  - H : Healthy
   *  - D : Diabetes
   *  - T : Tuberculosis
   *  - X : Dead
   *
   *  Quarantine provides medicines to the patients, but can not target a specific group of patient
   *  The same drugs are always given to all the patients
   *  Then Quarantine can provide a report that gives the number of patients that have the given disease
   */
  public setup() {
    this.quarantine = new Quarantine({ F: 1, P: 3, H: 2, D: 3, T: 1, X: 0 });
  }

  //! ********** TEST BEFORE DRUG **********

  @Test()
  /**
   * @method beforeTreatment
   * @description - Get the report of the patients before treatment
   */
  public beforeTreatment(): void {
    Expect(this.quarantine.report()).toEqual({ F: 1, P: 3, H: 2, D: 3, T: 1, X: 0 });
  }

  //! ********** TEST WITHOUT DRUG **********

  @Test()
  /**
   * @method noTreatment
   * @description - Simulate what happens if no treatment is given to the patients:
   *  - If a diabetic patient does not have insulin, he will die
   */
  public noTreatment(): void {
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 1, P: 3, H: 2, D: 0, T: 1, X: 3 });
  }

    //! ********** TESTS WITH ONLY ONE DRUG **********

  @Test()
  /**
   * @method antibiotic
   * @description - Simulate what happens if an antibiotics is given to the patients:
   *  - For a tuberculosis patient, the tuberculosis will be cured
   *  - For a diabetic patient, he will die
   */
  public antibiotic(): void {
    this.quarantine.setDrugs(['An']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 1, P: 3, H: 3, D: 0, T: 0, X: 3 });
  }

  @Test()
  /**
   * @method aspirin
   * @description - Simulate what happens if aspirin is given to the patients:
   *  - For a feverish patient, the fever will be cured
   *  * - For a painly patient, the pain will be cured
   *  - For a diabetic patient, he will die
   */
  public aspirin(): void {
    this.quarantine.setDrugs(['As']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 6, D: 0, T: 1, X: 3 });
  }

  @Test()
  /**
   * @method ibuprofen 
   * * (additional test to check the logic flexibility)
   * @description - Simulate what happens if ibuprofen is given to the patients:
   *  - For a feverish patient, the fever will be cured
   *  * - For a painly patient, the pain will be cured
   *  - For a diabetic patient, he will die
   */
  public ibuprofen(): void {
    this.quarantine.setDrugs(['Ib']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 6, D: 0, T: 1, X: 3 });
  }

  @Test()
  /**
   * @method insulin
   * @description - Simulate what happens if an insulin is given to the patients:
   *  - For a diabetic patient, he will not die
   */
  public insulin(): void {
    this.quarantine.setDrugs(['I']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 1, P: 3, H: 2, D: 3, T: 1, X: 0 });
  }

  @Test()
  /**
   * @method paracetamol
   * @description - Simulate what happens if paracetamol is given to the patients:
   *  - For a feverish patient, the fever will be cured
   *  * - For a painly patient, the pain will be cured
   *  - For a diabetic patient, he will die
   */
  public paracetamol(): void {
    this.quarantine.setDrugs(['P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 6, D: 0, T: 1, X: 3 });
  }

  //! ********** TESTS WITH TWO DRUGS **********

  @Test()
  /**
   * @method antibioticAndAspirin
   * @description - Simulate what happens if antibiotics & aspirin are given to the patients:
   *  - For a feverish patient, the fever will be cured
   *  * - For a painly patient, the pain will be cured
   *  - For a diabetic patient, he will die
   *  - For a tuberculosis patient, the tuberculosis will be cured
   */
  public antibioticAndAspirin(): void {
    this.quarantine.setDrugs(['An', 'As']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 7, D: 0, T: 0, X: 3 });
  }

  @Test()
  /**
   * @method antibioticAndIburopfen
   * * (additional test to check the logic flexibility)
   * @description - Simulate what happens if antibiotics & ibuprofen are given to the patients:
   *  - For a feverish patient has, the fever will be cured
   *  * - For a painly patient, the pain will be cured
   *  - For a diabetic patient, he will die
   *  - For a tuberculosis patient, the tuberculosis will be cured
   */
  public antibioticAndIburopfen(): void {
    this.quarantine.setDrugs(['An', 'Ib']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 7, D: 0, T: 0, X: 3 });
  }

  @Test()
  /**
   * @method antibioticAndInsulin
   * @description - Simulate what happens if antibiotics & insulin are given to the patients:
   *  - For a healthy patient, the patient will have a fever
   *  - For a diabetic patient, he will not die
   *  - For a tuberculosis patient, the tuberculosis will be cured
   */
  public antibioticAndInsulin(): void {
    this.quarantine.setDrugs(['An', 'I']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 3, P: 3, H: 1, D: 3, T: 0, X: 0 });
  }

  @Test()
  /**
   * @method antibioticAndParacetamol
   * @description - Simulate what happens if antibiotics & paracetamol are given to the patients:
   *  - For a feverish patient, the fever will be cured
   *  * - For a painly patient, the pain will be cured
   *  - For a diabetic patient, he will die
   *  - For a tuberculosis patient, the tuberculosis will be cured
   */
  public antibioticAndParacetamol(): void {
    this.quarantine.setDrugs(['An', 'P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 7, D: 0, T: 0, X: 3 });
  }

  @Test()
  /**
   * @method aspirinAndIbuprofen
   * * (additional test to check the logic flexibility)
   * @description - Simulate what happens if aspirin & ibuprofen are given to the patients:
   *  - For any patient, he will die
   */
  public aspirinAndIbuprofen(): void {
    this.quarantine.setDrugs(['As', 'Ib']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 0, D: 0, T: 0, X: 10 });
  }

  @Test()
  /**
   * @method aspirinAndInsulin
   * @description - Simulate what happens if aspirin & insulin are given to the patients:
   *  - For a feverish patient, the fever will be cured
   *  * - For a painly patient, the pain will be cured
   *  - For a diabetic patient, he will not die
   */
  public aspirinAndInsulin(): void {
    this.quarantine.setDrugs(['As', 'I']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 6, D: 3, T: 1, X: 0 });
  }

  @Test()
  /**
   * @method aspirinAndParacetamol
   * @description - Simulate what happens if aspirin & paracetamol are given to the patients:
   *  - For any patient, he will die
   */
  public aspirinAndParacetamol(): void {
    this.quarantine.setDrugs(['P', 'As']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 0, D: 0, T: 0, X: 10 });
  }

  @Test()
  /**
   * @method ibuprofenAndInsulin
   * * (additional test to check the logic flexibility)
   * @description - Simulate what happens if ibuprofen & insulin are given to the patients:
   *  - For a feverish patient, the fever will be cured
   *  * - For a painly patient, the pain will be cured
   *  - For a diabetic patient, he will not die
   */
  public ibuprofenAndInsulin(): void {
    this.quarantine.setDrugs(['Ib', 'I']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 6, D: 3, T: 1, X: 0 });
  }

  @Test()
  /**
   * @method ibuprofenAndParacetamol
   * * (additional test to check the logic flexibility)
   * @description - Simulate what happens if ibuprofen & paracetamol are given to the patients:
   *  - For a feverish patient, the fever will be cured
   *  * - For a painly patient, the pain will be cured
   *  - For a diabetic patient, he will die
   * */
  public ibuprofenAndParacetamol(): void {
    this.quarantine.setDrugs(['P', 'Ib']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 6, D: 0, T: 1, X: 3 });
  }

  @Test()
  /**
   * @method insulinAndParacetamol
   * @description - Simulate what happens if insulin & paracetamol are given to the patients:
   *  - For a feverish patient, his fever will be cured
   *  * - For a painly patient, the pain will be cured
   *  - For a diabetic patient, he will not die
   */
  public insulinAndParacetamol(): void {
    this.quarantine.setDrugs(['P', 'I']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 6, D: 3, T: 1, X: 0 });
  }

  //! ********** TESTS WITH THREE DRUGS **********

  @Test()
  /**
   * @method antibioticAspirinAndIbuprofen
   * * (additional test to check the logic flexibility)
   * @description - Simulate what happens if antibiotic, aspirin & ibuprofen are given to the patients:
   *  - For any patient, he will die
   */
  public antibioticAspirinAndIbuprofen(): void {
    this.quarantine.setDrugs(['An', 'As', 'Ib']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 0, D: 0, T: 0, X: 10 });
  }

  @Test()
  /**
   * @method antibioticAspirinAndInsulin
   * @description - Simulate what happens if antibiotic, aspirin & insulin are given to the patients:
   *  - For a feverish patient, the fever will be cured
   *  * - For a painly patient, the pain will be cured
   *  - For a healthy patient, he will have a fever
   *  - For a diabetic patient, he will not die
   */
  public antibioticAspirinAndInsulin(): void {
    this.quarantine.setDrugs(['An', 'As', 'I']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 2, P: 0, H: 5, D: 3, T: 0, X: 0 });
  }

  @Test()
  /**
   * @method antibioticAspirinAndParacetamol
   * @description - Simulate what happens if antibiotic, aspirin & paracetamol are given to the patients:
   *  - For any patient, he will die
   */
  public antibioticAspirinAndParacetamol(): void {
    this.quarantine.setDrugs(['An', 'As', 'P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 0, D: 0, T: 0, X: 10 });
  }

  @Test()
  /**
   * @method antibioticIburopfenAndInsulin
   * * (additional test to check the logic flexibility)
   * @description - Simulate what happens if antibiotic, iburopfen & insulin are given to the patients:
   *  - For a feverish patient, the fever will be cured
   *  * - For a painly patient, the pain will be cured
   *  - For a healthy patient, he will have a fever
   *  - For a diabetic patient, he will not die
   */
  public antibioticIburopfenAndInsulin(): void {
    this.quarantine.setDrugs(['An', 'Ib', 'I']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 2, P: 0, H: 5, D: 3, T: 0, X: 0 });
  }

  @Test()
  /**
   * @method antibioticIburopfenAndParacetamol
   * * (additional test to check the logic flexibility)
   * @description - Simulate what happens if antibiotic, iburopfen & paracetamol are given to the patients:
   *  - For a feverish patient, the fever will be cured
   *  * - For a painly patient, the pain will be cured
   *  - For a diabetic patient, he will die
   *  - For a tuberculosis patient, the tuberculosis will be cured
   */
  public antibioticIburopfenAndParacetamol(): void {
    this.quarantine.setDrugs(['An', 'Ib', 'P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 7, D: 0, T: 0, X: 3 });
  }

  @Test()
  /**
   * @method antibioticInsulinAndParacetamol
   * @description - Simulate what happens if antibiotic, insulin & paracetamol are given to the patients:
   *  - For a feverish patient, the fever will be cured
   *  * - For a painly patient, the pain will be cured
   *  - For a healthy patient, he will have a fever
   *  - For a diabetic patient, he will not die
   */
  public antibioticInsulinAndParacetamol(): void {
    this.quarantine.setDrugs(['An', 'I', 'P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 2, P: 0, H: 5, D: 3, T: 0, X: 0 });
  }

  @Test()
  /**
   * @method aspirinIbuprofenAndInsulin
   * * (additional test to check the logic flexibility)
   * @description - Simulate what happens if aspirin, iburopfen & insulin are given to the patients:
   *  - For any patient, he will die
   */
  public aspirinIbuprofenAndInsulin(): void {
    this.quarantine.setDrugs(['As', 'Ib', 'I']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 0, D: 0, T: 0, X: 10 });
  }

  @Test()
  /**
   * @method aspirinIbuprofenAndParacetamol
   * * (additional test to check the logic flexibility)
   * @description - Simulate what happens if aspirin, iburopfen & paracetamol are given to the patients:
   *  - For any patient, he will die
   */
  public aspirinIbuprofenAndParacetamol(): void {
    this.quarantine.setDrugs(['As', 'Ib', 'P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 0, D: 0, T: 0, X: 10 });
  }

  @Test()
  /**
   * @method aspirinInsulinAndParacetamol
   * @description - Simulate what happens if aspirin, insulin & paracetamol are given to the patients:
   *  - For any patient, he will die
   */
  public aspirinInsulinAndParacetamol(): void {
    this.quarantine.setDrugs(['As', 'I', 'P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 0, D: 0, T: 0, X: 10 });
  }

  @Test()
  /**
   * @method ibuprofenInsulinAndParacetamol
   * * (additional test to check the logic flexibility)
   * @description - Simulate what happens if ibuprofen, insulin & paracetamol are given to the patients:
   *  - For a feverish patient, the fever will be cured
   *  * - For a painly patient, the pain will be cured
   *  - For a diabetic patient, he will not die
   */
  public ibuprofenInsulinAndParacetamol(): void {
    this.quarantine.setDrugs(['Ib', 'I', 'P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 6, D: 3, T: 1, X: 0 });
  }

  //! ********** TESTS WITH FOUR DRUGS **********

  @Test()
  /**
   * @method antibioticAspirinIbuprofenAndInsulin
   * * (additional test to check the logic flexibility)
   * @description - Simulate what happens if antibiotic, aspirin, insulin & paracetamol are given to the patients:
   *  - For any patient, he will die
   */
  public antibioticAspirinIbuprofenAndInsulin(): void {
    this.quarantine.setDrugs(['An', 'As', 'Ib', 'I']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 0, D: 0, T: 0, X: 10 });
  }

  @Test()
  /**
   * @method antibioticAspirinIbuprofenAndParacetamol
   * * (additional test to check the logic flexibility)
   * @description - Simulate what happens if antibiotic, aspirin, insulin & paracetamol are given to the patients:
   *  - For any patient, he will die
   */
  public antibioticAspirinIbuprofenAndParacetamol(): void {
    this.quarantine.setDrugs(['An', 'As', 'Ib', 'P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 0, D: 0, T: 0, X: 10 });
  }

  @Test()
  /**
   * @method antibioticAspirinInsulinAndParacetamol
   * @description - Simulate what happens if antibiotic, aspirin, insulin & paracetamol are given to the patients:
   *  - For any patient, he will die
   */
  public antibioticAspirinInsulinAndParacetamol(): void {
    this.quarantine.setDrugs(['An', 'As', 'I', 'P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 0, D: 0, T: 0, X: 10 });
  }

  @Test()
  /**
   * @method antibioticIbuprofenInsulinAndParacetamol
   * * (additional test to check the logic flexibility)
   * @description - Simulate what happens if antibiotic, aspirin, insulin & paracetamol are given to the patients:
   *  - For a feverish patient, the fever will be cured
   *  * - For a painly patient, the pain will be cured
   *  - For a diabetic patient, he will not die
   *  - For a tuberculosis patient, the tuberculosis will be cured
   */
  public antibioticIbuprofenInsulinAndParacetamol(): void {
    this.quarantine.setDrugs(['An', 'Ib', 'I', 'P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 2, P: 0, H: 5, D: 3, T: 0, X: 0 });
  }

  @Test()
  /**
   * @method aspirinIbuprofenInsulinAndParacetamol
   * * (additional test to check the logic flexibility)
   * @description - Simulate what happens if antibiotic, aspirin, insulin & paracetamol are given to the patients:
   *  - For any patient, he will die
   */
  public aspirinIbuprofenInsulinAndParacetamol(): void {
    this.quarantine.setDrugs(['As', 'Ib', 'I', 'P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 0, D: 0, T: 0, X: 10 });
  }

  //! ********** TESTS WITH FIVE DRUGS **********

  @Test()
  /**
   * @method antibioticAspirinIbuprofenInsulinAndParacetamol
   * * (additional test to check the logic flexibility)
   * @description - Simulate what happens if antibiotic, aspirin, ibuprofen, insulin & paracetamol are given to the patients:
   *  - For any patient, he will die
   */
  public antibioticAspirinIbuprofenInsulinAndParacetamol(): void {
    this.quarantine.setDrugs(['An', 'As', 'Ib', 'I', 'P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, P: 0, H: 0, D: 0, T: 0, X: 10 });
  }
}
