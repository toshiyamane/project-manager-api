module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: [ '@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
root:true,
env:{
  node:true,
  jest:true,
},
ignorePatters:['.eslintrc.js'],
rules:{
  '@typescript-eslint/interface-name-prefix':'off',
  '@typescript-eslint/explixit-function-return-type':'off',
  '@typescript-eslint/explixit-module-boundary-types':'off',
  '@typescript-eslint/no-explicit-any':'off',
}
  }
