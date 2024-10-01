import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/Dash');
  await page.getByText('President', { exact: true }).click();
  await page.getByPlaceholder('Search President').click();
  await page.getByPlaceholder('Search President').fill('Adams J');
  await page.getByPlaceholder('Search President').press('Enter');
  await page.getByRole('button', { name: 'Search' }).first().click();
  await page.getByRole('cell', { name: 'Adams J', exact: true }).click();
  await page.getByRole('cell', { name: '1735' }).click();
  await page.getByPlaceholder('From').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-0').getByText('Prvp').click();
});