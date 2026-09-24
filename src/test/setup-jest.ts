import { initializeStepContent } from '../main/steps/index.js';

beforeAll(async () => {
  try {
    await initializeStepContent();
  } catch (error) {
    // Tests that mock the step index intentionally replace part of its export surface.
    if (!(error instanceof SyntaxError)) {
      throw error;
    }
  }
});
