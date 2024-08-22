import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.goto('http://localhost:4200/Dash');
    await page.getByRole('button', { name: 'Get Started' }).click();
    await page.getByText('State').click();
    await page.getByText('AdminPrVp').click();
  });
