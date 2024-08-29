import { test, expect, Page } from '@playwright/test';
import { PrvpComponent } from './../prvp/prvp.component';
import { PrvpService } from './../api/prvp.service';
import { Observable, of } from 'rxjs';

test.describe('PrvpComponent', () => {
  let page: Page;
  let component: PrvpComponent;
  let mockPrvpService: PrvpService;
  

  test.beforeEach(async ({ page }) => {
    // Mock PrvpService
    mockPrvpService = {
      getAdminprvps: (): Observable<any[]> => of([
        { adminNr: '1', presName: 'John Doe', vicePresName: 'Jane Smith' },
        { adminNr: '2', presName: 'Alice Johnson', vicePresName: 'Bob Brown' }
      ])
    } as PrvpService;

    // Create component instance
    component = new PrvpComponent(mockPrvpService);

    // Mount component (assuming you have a method to mount Angular components in Playwright)
    await mountAngularComponent(page, PrvpComponent);
  });

  test('should initialize correctly', async () => {
    expect(component.searchTerm).toBe('');
    expect(component.tableTitle).toBe('AdminPrVp');
    expect(typeof component.datetime).toBe('string');
    expect(component.presidentsData).toEqual([]);
    expect(component.filteredData).toEqual([]);
  });

  test('loadAdminprvps should fetch and set data', async () => {
    await new Promise<void>((resolve) => {
      component.loadAdminprvps();
      setTimeout(() => {
        expect(component.presidentsData).toHaveLength(2);
        expect(component.filteredData).toHaveLength(2);
        expect(component.presidentsData[0].adminNr).toBe('1');
        expect(component.presidentsData[1].presName).toBe('Alice Johnson');
        resolve();
      }, 0);
    });
  });

  test('updateDateTime should set current date and time', async () => {
    const initialDateTime = component.datetime;
    await new Promise(resolve => setTimeout(resolve, 1100)); // Wait for more than 1 second
    component.updateDateTime();
    expect(component.datetime).not.toBe(initialDateTime);
  });

  test('onSearch should filter data correctly', async () => {
    component.presidentsData = [
      { adminNr: '1', presName: 'John Doe', vicePresName: 'Jane Smith' },
      { adminNr: '2', presName: 'Alice Johnson', vicePresName: 'Bob Brown' }
    ];
    component.filteredData = [...component.presidentsData];

    component.searchTerm = 'john';
    component.onSearch();
    expect(component.filteredData).toHaveLength(2);
    expect(component.filteredData[0].presName).toBe('John Doe');

    component.searchTerm = '2';
    component.onSearch();
    expect(component.filteredData).toHaveLength(1);
    expect(component.filteredData[0].adminNr).toBe('2');

    component.searchTerm = '';
    component.onSearch();
    expect(component.filteredData).toHaveLength(2);
  });

  test('setTableTitle should update table title', async () => {
    component.setTableTitle('New Title');
    expect(component.tableTitle).toBe('New Title');
  });

  test('deleteRow should remove row from data', async () => {
    component.presidentsData = [
      { adminNr: '1', presName: 'John Doe', vicePresName: 'Jane Smith' },
      { adminNr: '2', presName: 'Alice Johnson', vicePresName: 'Bob Brown' }
    ];
    component.filteredData = [...component.presidentsData];

    component.deleteRow('1');
    expect(component.presidentsData).toHaveLength(1);
    expect(component.filteredData).toHaveLength(1);
    expect(component.presidentsData[0].adminNr).toBe('2');
    expect(component.filteredData[0].adminNr).toBe('2');
  });

//อันนี้คือส่วน UI แล้ว

//   test('UI elements are rendered correctly', async ({ page }) => {
//     await expect(page.locator('input[placeholder="Search"]')).toBeVisible();
//     await expect(page.locator('h2:has-text("AdminPrVp")').first()).toBeVisible();
//     await expect(page.locator('table')).toBeVisible();
//   });

//   test('Search functionality works in UI', async ({ page }) => {
//     await page.fill('input[placeholder="Search"]', 'John');
//     await page.click('button:has-text("Search")');
    
//     await expect(page.locator('table tbody tr')).toHaveCount(1);
//     await expect(page.locator('table tbody tr td:has-text("John Doe")').first()).toBeVisible();
//   });

//   test('Delete functionality works in UI', async ({ page }) => {
//     const initialRowCount = await page.locator('table tbody tr').count();
    
//     await page.click('table tbody tr:first-child button:has-text("Delete")');
    
//     await expect(page.locator('table tbody tr')).toHaveCount(initialRowCount - 1);
//   });
});

// Helper function to mount Angular component (implementation depends on your setup)
async function mountAngularComponent(page: Page, component: any) {
  // Implementation details would go here
}