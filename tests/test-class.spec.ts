import { test, expect, Page } from '@playwright/test';

// Define the type for entityType explicitly
type EntityType = 'function' | 'module' | 'class' | 'object';

// Function to check for new entities in the window object
async function checkNewEntity(
  page: Page,
  entityName: string,
  entityType: EntityType = 'function'
) {
  const isEntityDefined = await page.evaluate(
    ({ entityName, entityType }) => {
      const entity = (window as any)[entityName];
      if (entityType === 'module' || entityType === 'object') {
        return !!entity;
      } else if (entityType === 'function' || entityType === 'class') {
        return typeof entity === 'function' && (entityType === 'class' ? new entity() instanceof entity : true);
      }
      return false;
    },
    { entityName, entityType }
  );

  if (isEntityDefined) {
    console.error(`New ${entityType} "${entityName}" detected!`);
  } else {
    console.log(`No new ${entityType} "${entityName}" detected. Everything is normal.`);
  }
}

test.describe('State Component Tests', () => {
  let page: Page;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('/State');
  });

  test('should display table with correct headers', async () => {
    const headers = await page.locator('nz-table thead th').allTextContents();
    expect(headers).toEqual(['StateName', 'AdminEntered', 'YearEntered']);
  });

  test('should update the table title correctly', async () => {
    // Verify the table title is correct
    const titleElement = page.locator('h1.header');
    const titleText = await titleElement.textContent();
    expect(titleText).toBe('State');
  });


});
