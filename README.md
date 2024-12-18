# Hospital

Main infos are available in the [hospital.pdf](hospital.pdf) file.

[![GitHub Last Commit](https://badgen.net/github/last-commit/philippebeck/ppl-test)](https://github.com/philippebeck/ppl-test)

[![GitHub Top Language](https://img.shields.io/github/languages/top/philippebeck/ppl-test)](https://github.com/philippebeck/ppl-test)
[![Code Size](https://img.shields.io/github/languages/code-size/philippebeck/ppl-test)](https://github.com/philippebeck/ppl-test)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/4993d35421024f7b9b40068625cadd56)](https://app.codacy.com/gh/philippebeck/ppl-test/dashboard)
[![Maintainability](https://api.codeclimate.com/v1/badges/3f0de77ce7af13bf40aa/maintainability)](https://codeclimate.com/github/philippebeck/ppl-test/maintainability)

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

- **main** => the production branch *(the same as the dev + ext branches after completion of the code process)*  
- **dev**  => the development branch with all steps of the code process, notably the quarantine class, the rules constantes & the new   
- **lib-test** => the test branch of the library with an additional patient state, an additional drug & new tests for them  
- **fe-ext** => the extension branch of the frontend with 2 additional features *(auto refresh & manual input)*  
- **refacto** => the refactoring branch of the frontend with 1 additional package *(sweet alert)*  
- **lib-vite** => the vite branch of the library without the import bug, but without tests functioning on *(config)*