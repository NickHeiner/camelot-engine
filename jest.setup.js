// jest.setup.js
require('@testing-library/jest-dom');

// Polyfill for structuredClone
if (typeof structuredClone === 'undefined') {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}
