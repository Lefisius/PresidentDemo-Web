import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/Dash');
  await page.getByText('Stration').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-0').getByText('Prvp').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-1').getByText('Election').click();
  await page.getByText('PresHobby').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-2').getByText('President').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-3').getByText('PresMarriage').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-4').getByText('State').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-5').getByText('Stration').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-6').getByText('Prvp').click();
  await page.getByRole('row', { name: '1 Washington G Adams J Delete' }).getByRole('button').click();
  await page.getByRole('row', { name: 'Washington G Adams J Delete' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-7').getByText('PresHobby').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-8').getByText('President').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-9').getByText('PresMarriage').click();
  await page.getByRole('row', { name: 'Adams J Smith A 28 19 5 1764' }).getByRole('button').click();
});
