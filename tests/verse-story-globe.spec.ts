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

  test('mobile story globe is compact and no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/#features', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-testid="story-visual-mobile-feature-secure-wallet"]', { timeout: 30_000 });

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    expect(overflow).toBe(false);

    const visual = page.locator('[data-testid="story-visual-mobile-feature-secure-wallet"]').first();
    await expect(visual).toBeVisible();

    const box = await visual.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeLessThanOrEqual(390);
  });
});
