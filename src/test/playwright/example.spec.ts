import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://nfdiv-frontend-pr-3310.preview.platform.hmcts.net/');

  // Expect a title "to contain" a substring.
  await expect(await page.innerText('body')).toContain('404');
});
