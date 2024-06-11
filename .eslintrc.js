module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-native/no-inline-styles': 0,
    'react-native/no-unused-styles': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
  },
  "prettier/prettier": [
    "error",
    {
      "endOfLine": "auto"
    }
  ]
};
