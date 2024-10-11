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
   *  - H : Healthy
   *  - F : Fever
   *  - D : Diabetes
   *  - T : Tuberculosis
   *  - X : Dead
   *
   *  Quarantine provides medicines to the patients, but can not target a specific group of patient
   *  The same drugs are always given to all the patients
   *  Then Quarantine can provide a report that gives the number of patients that have the given disease
   */
  public setup() {
    this.quarantine = new Quarantine({ F: 1, H: 2, D: 3, T: 1, X: 0 });
  }

  //! ********** TEST BEFORE DRUG **********

  @Test()
  /**
   * @method beforeTreatment
   * @description - Get the report of the patients before treatment
   */
  public beforeTreatment(): void {
    Expect(this.quarantine.report()).toEqual({ F: 1, H: 2, D: 3, T: 1, X: 0 });
  }

  //! ********** TEST WITHOUT DRUG **********

  @Test()
  /**
   * @method noTreatment
   * @description - Simulate what happens if no treatment is given to the patients
   *  The rules are as follows:
   *  - If diabetics patient does not have insulin, he will die
   */
  public noTreatment(): void {
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 1, H: 2, D: 0, T: 1, X: 3 });
  }

    //! ********** TESTS WITH ONLY ONE DRUG **********

  @Test()
  /**
   * @method antibiotic
   * @description - Simulate what happens if an antibiotics is given to the patients
   *  The rules are as follows:
   *  - If a tuberculosis patient has antibiotics, the tuberculosis will be cured
   *  - If a diabetic patient has only antibiotics, he will die
   */
  public antibiotic(): void {
    this.quarantine.setDrugs(['An']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 1, H: 3, D: 0, T: 0, X: 3 });
  }

  @Test()
  /**
   * @method aspirin
   * @description - Simulate what happens if aspirin is given to the patients
   *  The rules are as follows:
   *  - If a feverish patient has aspirin, the fever will be cured
   *  - If a diabetic patient has only aspirin, he will die
   */
  public aspirin(): void {
    this.quarantine.setDrugs(['As']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, H: 3, D: 0, T: 1, X: 3 });
  }

  @Test()
  /**
   * @method insulin
   * @description - Simulate what happens if an insulin is given to the patients
   *  The rules are as follows:
   *  - If a diabetic patient has insulin, he will not die
   */
  public insulin(): void {
    this.quarantine.setDrugs(['I']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 1, H: 2, D: 3, T: 1, X: 0 });
  }

  @Test()
  /**
   * @method paracetamol
   * @description - Simulate what happens if paracetamol is given to the patients
   *  The rules are as follows:
   *  - If a feverish patient has paracetamol, the fever will be cured
   *  - If a diabetic patient has only paracetamol, he will die
   */
  public paracetamol(): void {
    this.quarantine.setDrugs(['P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, H: 3, D: 0, T: 1, X: 3 });
  }

  //! ********** TESTS WITH TWO DRUGS **********

  @Test()
  /**
   * @method antibioticAndAspirin
   * @description - Simulate what happens if antibiotics & aspirin are given to the patients
   *  The rules are as follows:
   *  - If a feverish patient has antibiotics & aspirin, the fever will be cured
   *  - If a diabetic patient has only antibiotics & aspirin, he will die
   *  - If a tuberculosis patient has antibiotics & aspirin, the tuberculosis will be cured
   */
  public antibioticAndAspirin(): void {
    this.quarantine.setDrugs(['An', 'As']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, H: 4, D: 0, T: 0, X: 3 });
  }

  @Test()
  /**
   * @method antibioticAndInsulin
   * @description - Simulate what happens if antibiotics & insulin are given to the patients
   *  The rules are as follows:
   *  - If a healthy patient has antibiotics & insulin, the patient will have a fever
   *  - If a diabetic patient has antibiotics & insulin, he will not die
   *  - If a tuberculosis patient has antibiotics & insulin, the tuberculosis will be cured
   */
  public antibioticAndInsulin(): void {
    this.quarantine.setDrugs(['An', 'I']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 3, H: 1, D: 3, T: 0, X: 0 });
  }

  @Test()
  /**
   * @method antibioticAndParacetamol
   * @description - Simulate what happens if antibiotics & paracetamol are given to the patients
   *  The rules are as follows:
   *  - If a feverish patient has antibiotics & paracetamol, the fever will be cured
   *  - If a diabetic patient has only antibiotics & paracetamol, he will die
   *  - If a tuberculosis patient has antibiotics & paracetamol, the tuberculosis will be cured
   */
  public antibioticAndParacetamol(): void {
    this.quarantine.setDrugs(['An', 'P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, H: 4, D: 0, T: 0, X: 3 });
  }

  @Test()
  /**
   * @method aspirinAndInsulin
   * @description - Simulate what happens if aspirin & insulin are given to the patients
   *  The rules are as follows:
   *  - If a feverish patient has aspirin & insulin, the fever will be cured
   *  - If a diabetic patient has aspirin & insulin, he will not die
   */
  public aspirinAndInsulin(): void {
    this.quarantine.setDrugs(['As', 'I']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, H: 3, D: 3, T: 1, X: 0 });
  }

  @Test()
  /**
   * @method aspirinAndParacetamol
   * @description - Simulate what happens if aspirin & paracetamol are given to the patients
   *  The rules are as follows:
   *  - If any patient has aspirin & paracetamol, he will die
   */
  public aspirinAndParacetamol(): void {
    this.quarantine.setDrugs(['P', 'As']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, H: 0, D: 0, T: 0, X: 7 });
  }

  @Test()
  /**
   * @method insulinAndParacetamol
   * @description - Simulate what happens if insulin & paracetamol are given to the patients
   *  The rules are as follows:
   *  - If a feverish patient has insulin & paracetamol, his fever will be cured
   *  - If a diabetic patient has insulin & paracetamol, he will not die
   */
  public insulinAndParacetamol(): void {
    this.quarantine.setDrugs(['P', 'I']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, H: 3, D: 3, T: 1, X: 0 });
  }

  //! ********** TESTS WITH THREE DRUGS **********

  @Test()
  /**
   * @method antibioticAspirinAndInsulin
   * @description - Simulate what happens if antibiotic, aspirin & insulin are given to the patients
   *  The rules are as follows:
   *  - If a feverish patient has antibiotic, aspirin & insulin, the fever will be cured
   *  - If a healthy patient has antibiotic, aspirin & insulin, he will have a fever
   *  - If a diabetic patient has antibiotic, aspirin & insulin, he will not die
   */
  public antibioticAspirinAndInsulin(): void {
    this.quarantine.setDrugs(['An', 'As', 'I']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 2, H: 2, D: 3, T: 0, X: 0 });
  }

  @Test()
  /**
   * @method antibioticAspirinAndParacetamol
   * @description - Simulate what happens if antibiotic, aspirin & paracetamol are given to the patients
   *  The rules are as follows:
   *  - If any patient has antibiotic, aspirin & paracetamol, he will die
   */
  public antibioticAspirinAndParacetamol(): void {
    this.quarantine.setDrugs(['An', 'As', 'P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, H: 0, D: 0, T: 0, X: 7 });
  }

  @Test()
  /**
   * @method antibioticInsulinAndParacetamol
   * @description - Simulate what happens if antibiotic, insulin & paracetamol are given to the patients
   *  The rules are as follows:
   *  - If a feverish patient has antibiotic, insulin & paracetamol, the fever will be cured
   *  - If a healthy patient has antibiotic, insulin & paracetamol, he will have a fever
   *  - If a diabetic patient has insulin & paracetamol, he will not die
   */
  public antibioticInsulinAndParacetamol(): void {
    this.quarantine.setDrugs(['An', 'I', 'P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 2, H: 2, D: 3, T: 0, X: 0 });
  }

  @Test()
  /**
   * @method aspirinInsulinAndParacetamol
   * @description - Simulate what happens if aspirin, insulin & paracetamol are given to the patients
   *  The rules are as follows:
   *  - If any patient has aspirin, insulin & paracetamol, he will die
   */
  public aspirinInsulinAndParacetamol(): void {
    this.quarantine.setDrugs(['As', 'I', 'P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, H: 0, D: 0, T: 0, X: 7 });
  }

  //! ********** TESTS WITH ALL DRUGS **********

  @Test()
  /**
   * @method antibioticAspirinInsulinAndParacetamol
   * @description - Simulate what happens if antibiotic, aspirin, insulin & paracetamol are given to the patients
   *  The rules are as follows:
   *  - If any patient has antibiotic, aspirin, insulin & paracetamol, he will die
   */
  public antibioticAspirinInsulinAndParacetamol(): void {
    this.quarantine.setDrugs(['An', 'As', 'I', 'P']);
    this.quarantine.wait40Days();

    Expect(this.quarantine.report()).toEqual({ F: 0, H: 0, D: 0, T: 0, X: 7 });
  }
}
