const { getStoryContext } = require('@storybook/test-runner');

module.exports = {
  setup() {
    // Add any global setup needed for your tests
  },
  async preVisit(page, context) {
    // Pre-visit hook - runs before each story
    await page.goto('about:blank');
  },
  async postVisit(page, context) {
    // Post-visit hook - runs after each story
    const storyContext = await getStoryContext(page, context);
    
    // You can add custom assertions here
    if (storyContext.title.includes('Button')) {
      // Example: ensure all buttons have proper accessibility
      const buttons = await page.locator('button').all();
      for (const button of buttons) {
        const ariaLabel = await button.getAttribute('aria-label');
        const textContent = await button.textContent();
        if (!ariaLabel && !textContent?.trim()) {
          throw new Error('Button must have either aria-label or text content');
        }
      }
    }
  },
  tags: {
    include: ['*'],
    exclude: ['skip-test'],
  },
};
