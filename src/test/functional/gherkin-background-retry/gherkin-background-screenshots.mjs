import { existsSync } from 'node:fs';
import path from 'node:path';

import Config from 'codeceptjs/lib/config';
import { testToFileName } from 'codeceptjs/lib/mocha/test';
import output from 'codeceptjs/lib/output';
import store from 'codeceptjs/lib/store';
import { getBrowserHelper } from 'codeceptjs/lib/utils/pluginParser';

import { isScreenshotRenameEnabled } from '../retry-audit/retry-audit-screenshot.mjs';

export const captureHookScreenshot = async (
  test,
  scenarioAttempt,
  hookAttempt,
  { helper = getBrowserHelper(), timeoutMs = 5000 } = {}
) => {
  const screenshotConfig = Config.get('plugins')?.screenshot ?? {};
  if (!isScreenshotRenameEnabled(screenshotConfig) || screenshotConfig.disableScreenshots || !helper) {
    return null;
  }
  const directory = store.outputDir;
  if (!directory) {
    return null;
  }
  const base = testToFileName(test, { suffix: '', unique: false });
  const fileName = `${base}.attempt_${scenarioAttempt}.before_${hookAttempt}.failed.png`;
  const file = path.join(directory, fileName);
  let timeout;
  try {
    if (helper.page?.isClosed?.() || helper.browser?.isConnected?.() === false) {
      return null;
    }
    // Use the page directly when available: screenshot errors must not be added
    // to Playwright's scenario-failure/cleanup tracking.
    const capture = helper.page?.screenshot
      ? helper.page.screenshot({
          path: file,
          fullPage: Boolean(screenshotConfig.fullPageScreenshots),
          timeout: timeoutMs,
        })
      : helper.saveScreenshot(fileName, screenshotConfig.fullPageScreenshots);
    await Promise.race([
      capture,
      new Promise((_, reject) => {
        timeout = setTimeout(() => reject(new Error('Hook screenshot timed out')), timeoutMs);
      }),
    ]);
    return existsSync(file) ? fileName : null;
  } catch (error) {
    output.plugin('hookRetry', `Could not capture Background screenshot: ${error?.message || String(error)}`);
    return null;
  } finally {
    clearTimeout(timeout);
  }
};

export const getTerminalHookScreenshot = test => {
  const screenshotConfig = Config.get('plugins')?.screenshot ?? {};
  const file = test.artifacts?.screenshot;
  return isScreenshotRenameEnabled(screenshotConfig) && !screenshotConfig.disableScreenshots && file && existsSync(file)
    ? path.basename(file)
    : null;
};
