import { test, expect } from '@playwright/test';

const stories = [
  ['feature-secure-wallet', 'wallet'],
  ['feature-provably-fair', 'fair'],
  ['feature-community-hub', 'community'],
  ['feature-developer-tools', 'devtools'],
] as const;

test.describe('VERSE story globe orbit audit', () => {
  test('all four stories use story globe orbit visuals with callout lines', async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto('/#features', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-testid="story-globe-wallet"]', { timeout: 30_000 });

    for (const [id, theme] of stories) {
      const counts = await page.evaluate(({ id, theme }) => {
        const section = document.getElementById(id);
        const visual = section?.querySelector(`[data-testid="story-visual-${id}"]`);
        return {
          section: !!section,
          visual: !!visual,
          globe: !!visual?.querySelector(`[data-testid="story-globe-${theme}"]`),
          core: !!visual?.querySelector(`[data-testid="story-core-${theme}"]`),
          paths: visual?.querySelectorAll('svg path').length ?? 0,
          nodes: visual?.querySelectorAll('[data-testid^="story-orbit-node-"]').length ?? 0,
          labels: visual?.querySelectorAll('[data-testid^="story-orbit-label-"]').length ?? 0,
        };
      }, { id, theme });

      expect(counts.section).toBe(true);
      expect(counts.visual).toBe(true);
      expect(counts.globe).toBe(true);
      expect(counts.core).toBe(true);
      expect(counts.paths).toBeGreaterThan(0);
      expect(counts.nodes).toBeGreaterThan(0);
      expect(counts.labels).toBeGreaterThan(0);
    }
  });

  test('desktop orbit labels stay fixed while pointer lines exist', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto('/#features', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-testid="story-globe-wallet"]', { timeout: 30_000 });

    await page.locator('#feature-secure-wallet').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const before = await page.evaluate(() => {
      const globe = document.querySelector('[data-testid="story-globe-wallet"]')!.getBoundingClientRect();
      const label = document.querySelector('[data-testid="story-visual-feature-secure-wallet"] [data-testid="story-orbit-label-keys"]')!.getBoundingClientRect();
      return { x: label.x - globe.x, y: label.y - globe.y };
    });
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(300);
    const after = await page.evaluate(() => {
      const globe = document.querySelector('[data-testid="story-globe-wallet"]')!.getBoundingClientRect();
      const label = document.querySelector('[data-testid="story-visual-feature-secure-wallet"] [data-testid="story-orbit-label-keys"]')!.getBoundingClientRect();
      return { x: label.x - globe.x, y: label.y - globe.y };
    });

    expect(Math.abs(before.x - after.x)).toBeLessThan(6);
    expect(Math.abs(before.y - after.y)).toBeLessThan(6);

    const pathCount = await page.locator('[data-testid="story-visual-feature-secure-wallet"] svg path').count();
    expect(pathCount).toBeGreaterThan(0);
  });

  test('desktop story shows one active slide instead of stacked cards', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto('/#features', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-testid="story-globe-wallet"]', { timeout: 30_000 });

    await page.locator('#feature-secure-wallet').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const visibleCards = await page
      .locator('#feature-secure-wallet [data-testid^="story-step-"]')
      .evaluateAll((els) =>
        els.filter((el) => {
          const style = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.height > 0;
        }).length,
      );

    expect(visibleCards).toBeLessThanOrEqual(2);
  });

  test('mobile renders only mobile story layout and no desktop duplicate', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/#features', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-testid="story-visual-mobile-feature-secure-wallet"]', { timeout: 30_000 });
    await page.locator('#feature-secure-wallet').scrollIntoViewIfNeeded();

    await expect(page.locator('[data-testid="story-visual-mobile-feature-secure-wallet"]')).toHaveCount(1);
    await expect(page.locator('[data-testid="story-visual-feature-secure-wallet"]')).toHaveCount(0);
  });

  test('mobile story globe is compact and no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/#features', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-testid="story-visual-mobile-feature-secure-wallet"]', { timeout: 30_000 });

    const visual = page.locator('[data-testid="story-visual-mobile-feature-secure-wallet"]').first();
    await expect(visual).toBeVisible();

    const box = await visual.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeLessThanOrEqual(330);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    expect(overflow).toBe(false);
  });

  test('mobile labels stay fixed during story scroll', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/#features', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-testid="story-visual-mobile-feature-secure-wallet"]', { timeout: 30_000 });

    await page.locator('#feature-secure-wallet').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const before = await page.evaluate(() => {
      const globe = document.querySelector('[data-testid="story-visual-mobile-feature-secure-wallet"] [data-testid="story-globe-wallet"]')!.getBoundingClientRect();
      const label = document.querySelector('[data-testid="story-visual-mobile-feature-secure-wallet"] [data-testid="story-orbit-label-keys"]')!.getBoundingClientRect();
      return { x: label.x - globe.x, y: label.y - globe.y };
    });
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(300);
    const after = await page.evaluate(() => {
      const globe = document.querySelector('[data-testid="story-visual-mobile-feature-secure-wallet"] [data-testid="story-globe-wallet"]')!.getBoundingClientRect();
      const label = document.querySelector('[data-testid="story-visual-mobile-feature-secure-wallet"] [data-testid="story-orbit-label-keys"]')!.getBoundingClientRect();
      return { x: label.x - globe.x, y: label.y - globe.y };
    });

    expect(Math.abs(before.x - after.x)).toBeLessThan(6);
    expect(Math.abs(before.y - after.y)).toBeLessThan(6);
  });
});
