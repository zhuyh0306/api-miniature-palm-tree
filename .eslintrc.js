module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/no-unresolved': 0,
    'class-methods-use-this': 'off',
    'no-dynamic-require': '0'
  }
};
