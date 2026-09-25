const { initializeStepContent } = await import('../main/steps/index.js');

export {};

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
