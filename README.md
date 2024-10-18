# Hospital

Main infos are available in the [hospital.pdf](hospital.pdf) file.

## Hospital Be

The backend of the simulation of disease in a group of patients.

### Installation

```bash
cd hospital-be
```
- Then :
```bash
npm i
```
- Or :
```bash
yarn install
```

### Usage

- At the root of the backend project *(hospital-be)*, run:
```bash
npm start
``` 
- Or :  
```bash
yarn start
```

## Hospital Lib

A library for the simulation of disease in a group of patients.

### Installation

```bash
cd hospital-lib
```
- Then :
```bash
npm i
```
- Or :
```bash
yarn install
```

### Usage

- At the root of the library *(hospital-lib)*, run:
```bash
yarn link
```

### Test

- At the root of the library *(hospital-lib)*, run:
```bash
npm test
```
- Or :
```bash
yarn test
```

## Hospital Fe

The frontend of the simulation of disease in a group of patients.

### Installation

```bash
cd hospital-fe
```
- Then :
```bash
npm i
```
- Or :
```bash
yarn install
```

### Usage

- At the root of the frontend project *(hospital-fe)*, run:
```bash
yarn link hospital-lib
```
- And :
```bash
npm start
```
- Or :
```bash
yarn start
```

## Branches

- **main** => the production branch *(the same as the dev branch after completion of the code process)*  
- **dev**  => the development branch with all steps of the code process, notably the quarantine class, the rules constantes & the new   
- **lib-test** => the test branch of the library with an additional patient state, an additional drug & new tests for them  
