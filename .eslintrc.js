module.exports = {
  "extends": "eslint:recommended",
  "rules": {
    "no-console": "off"
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "script"
  },
  "globals": {
    "Window": true
  },
  "env": {
    "node": true,
    "es6": true,
    "mocha": true
  }
}