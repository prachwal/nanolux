// Ten plik informuje VS Code że Jest nie jest używany w tym projekcie
// Używamy Vitest zamiast Jest
module.exports = {
  // Wyłącz Jest
  projects: [],
  testMatch: [],
  // Przekieruj na Vitest
  displayName: "Use Vitest instead: npm run test"
}
