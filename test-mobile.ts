import { chromium } from 'playwright';

const URL = 'https://verse-kenshi.vercel.app';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  
  const results: { name: string; status: string; detail: string }[] = [];
  
  const click = async (selector: string, name: string) => {
    try {
      const el = page.locator(selector).first();
      await el.waitFor({ state: 'visible', timeout: 5000 });
      const box = await el.boundingBox();
      if (!box) { results.push({ name, status: 'FAIL', detail: 'No bounding box' }); return; }
      await el.click({ timeout: 5000 });
      results.push({ name, status: 'PASS', detail: `Clicked (${Math.round(box.width)}x${Math.round(box.height)})` });
    } catch (e: any) {
      results.push({ name, status: 'FAIL', detail: e.message?.slice(0, 80) });
    }
  };
  
  const scrollTo = async (id: string) => {
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'instant' });
    }, id);
    await page.waitForTimeout(500);
  };
  
  console.log('🔍 MOBILE TEST - VERSE Website (390x844)');
  console.log(`URL: ${URL}\n`);
  
  // Load page
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  
  // Wait for intro animation to complete (3.5s + buffer)
  console.log('⏳ Waiting for intro animation...');
  await page.waitForTimeout(5000);
  
  // Take screenshot after intro
  await page.screenshot({ path: '/root/verse/test-after-intro.png' });
  console.log('📸 Screenshot saved: test-after-intro.png\n');
  
  // === NAVBAR ===
  console.log('--- Navbar (Desktop hidden on mobile, test mobile menu) ---');
  await click('button:has(svg.lucide-menu)', 'Mobile Menu Toggle');
  await page.waitForTimeout(500);
  
  // Test menu items visibility
  for (const item of ['Home', 'Features', 'Academy', 'Events', 'Market', 'Docs', 'Build']) {
    try {
      const el = page.locator(`button:has-text("${item}")`).last();
      const visible = await el.isVisible({ timeout: 1000 });
      results.push({ name: `Menu: ${item}`, status: visible ? 'PASS' : 'FAIL', detail: visible ? 'Visible' : 'Not visible' });
    } catch { results.push({ name: `Menu: ${item}`, status: 'FAIL', detail: 'Error' }); }
  }
  
  // Close menu
  await click('button:has(svg.lucide-x)', 'Close Menu');
  await page.waitForTimeout(300);
  
  // === HERO ===
  console.log('\n--- Hero ---');
  await click('text=Start Learning', 'Hero: Start Learning');
  await page.waitForTimeout(300);
  await click('text=Explore Ecosystem', 'Hero: Explore Ecosystem');
  await page.waitForTimeout(300);
  
  // Stats
  for (const stat of ['50K+', '15+', '100+', '$10M+']) {
    await click(`button:has-text("${stat}")`, `Stat: ${stat}`);
    await page.waitForTimeout(200);
  }
  
  // === FEATURES ===
  console.log('\n--- Features ---');
  await scrollTo('features');
  await page.waitForTimeout(500);
  
  for (const title of ['Web3 Academy', 'VERSE Swap', 'Events Platform', 'Market Data', 'Asset Hub', 'Community Hub', 'Secure Wallet', 'Developer SDK']) {
    await click(`button:has-text("${title}")`, `Feature: ${title}`);
    await page.waitForTimeout(200);
  }
  
  // === LEARN ===
  console.log('\n--- Learn ---');
  await scrollTo('learn');
  await page.waitForTimeout(500);
  
  await click('text=Enroll Now', 'Learn: Enroll Now');
  
  // === EVENTS ===
  console.log('\n--- Events ---');
  await scrollTo('events');
  await page.waitForTimeout(500);
  
  await click('text=Register Now', 'Events: Register Now');
  
  // === MARKET ===
  console.log('\n--- Market ---');
  await scrollTo('market');
  await page.waitForTimeout(500);
  
  await click('button:has-text("Refresh")', 'Market: Refresh');
  
  // === DOCS ===
  console.log('\n--- Docs ---');
  await scrollTo('docs-section');
  await page.waitForTimeout(500);
  
  // Test doc sidebar buttons
  for (const section of ['Installation', 'Quick Start', 'Smart Contracts', 'API Reference']) {
    await click(`button:has-text("${section}")`, `Docs: ${section}`);
    await page.waitForTimeout(300);
  }
  
  await click('button:has-text("Copy")', 'Docs: Copy');
  
  // === BUILD ===
  console.log('\n--- Build ---');
  await scrollTo('build');
  await page.waitForTimeout(500);
  
  await click('text=Start Building', 'Build: Start Building');
  
  // === COMMUNITY ===
  console.log('\n--- Community ---');
  await scrollTo('community');
  await page.waitForTimeout(500);
  
  await click('text=Join Community', 'Community: Join Community');
  
  // === FOOTER ===
  console.log('\n--- Footer ---');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  
  await click('text=Back to top', 'Footer: Back to top');
  
  // Take final screenshot
  await page.screenshot({ path: '/root/verse/test-final.png' });
  
  // Print results
  console.log('\n' + '='.repeat(60));
  console.log('RESULTS');
  console.log('='.repeat(60));
  
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  
  for (const r of results) {
    const icon = r.status === 'PASS' ? '✅' : '❌';
    console.log(`${icon} ${r.name}: ${r.detail}`);
  }
  
  console.log(`\nTotal: ${results.length} | ✅ Pass: ${passed} | ❌ Fail: ${failed}`);
  console.log(`Pass rate: ${((passed / results.length) * 100).toFixed(1)}%`);
  
  if (failed > 0) {
    console.log('\n❌ FAILED TESTS:');
    for (const r of results.filter(r => r.status === 'FAIL')) {
      console.log(`  - ${r.name}: ${r.detail}`);
    }
  }
  
  await browser.close();
}

test().catch(console.error);
