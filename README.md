# JSBaseVietNam NodeJS Document

## Topics

- [ ] Setup Dev Environment
- [ ] Typescript
- [ ] OOP : SOLID Principles
- [ ] Common Design Pattern
- [ ] NodeJS Main Concept
- [ ] I/O : File, Stream, Buffer
- [ ] Light Framework: ExpressJS

### Setup Dev Environment

```bash
yarn add typescript
yarn add --dev @tsconfig/node16 @types/node ts-node
```

**main.ts**

```ts
console.log('JSBASEVIETNAM');
```

- [TSConfig Base](https://www.npmjs.com/package/@tsconfig/node16)

#### Debug

```bash
# build
tsc
# start server
node --inspect dist/main.js
```

### Typescript

#### Debug with typescript

```bash
yarn add -D ts-node-dev
```

**package.json**

```json
"dev:debug": "ts-node-dev --transpile-only --respawn --inspect=4321 --project tsconfig.dev.json src/main.ts",
"dev": "ts-node-dev --transpile-only --respawn --project tsconfig.dev.json src/main.ts",
```

#### Test

```bash
yarn add jest @types/jest @babel/preset-typescript @babel/preset-env -D
yarn jest --init
yarn test
```

#### ESLint

```bash
yarn add -D @typescript-eslint/eslint-plugin@latest eslint-config-google@latest eslint @typescript-eslint/parser@latest
touch .eslintrc.json
touch .eslintignore
```

**.eslintrc**

```json
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": ["google", "prettier"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {}
}
```

**.eslintignore**

```env
node_modules
dist
```

**package.json**

```json
"lint": "eslint -c .eslintrc.json --ext .ts src"
```

**.eslintrc.json**

#### How to fix eslint for typescript enum "is defined but never used" ?

```
"no-unused-vars": "off",
"@typescript-eslint/no-unused-vars": "error"
```

#### Husky

> Should run this setup at least 1

```bash
npx husky-init && yarn              # Yarn 1
# add hooks
npx husky add .husky/pre-commit "yarn lint"
# add execute permissions
ls -alh ./husky
chmod ug+x .husky/*
```

## ECMAScript

- [ES2020](https://www.freecodecamp.org/news/javascript-new-features-es2020/)

## FAQ

- [Typescript](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-functions-returning-non-void-assignable-to-function-returning-void)

# References

- [ESLint](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)
- [Google Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Ecma International's TC39](https://tc39.es/)
- [ECMA](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Resources)
