import { test, expect, Page } from '@playwright/test';
test.describe('Election Component Tests', () => {
  let page: Page;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('http://localhost:4200/Election');
  });


});
