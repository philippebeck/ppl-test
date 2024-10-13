# Hospital

Main infos are available in the [hospital.pdf](hospital.pdf) file.

## Hospital Lib

A library for the simulation of disease in a group of patients.

### Installation

```bash
cd hospital-lib
npm i
```

### Usage

- At the root of the library *(hospital-lib)*, run:
```bash
yarn link
```
- Then, at the root of the frontend project *(hospital-fe)*, run:
```bash
yarn link hospital-lib
```

### Test

```bash
yarn test
```

### Branches

- **main** => the production branch *(the same as the dev branch after completion of the code process)*  
- **dev**  => the development branch with all steps of the code process, notably the quarantine class, the rules constantes & the new   
- **test** => the test branch with an additional patient state, an additional drug & new tests for them  
