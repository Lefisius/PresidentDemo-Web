import { test, expect } from '@playwright/test';
import { of } from 'rxjs';
import { PresidentComponent } from '../president/president.component';

// การทดสอบ E2E
test('E2E Tests for President Component', async ({ page }) => {

    // 1. ทดสอบการทำงานของหน้าเว็บ
    await page.goto('http://localhost:4200/');
    await page.goto('http://localhost:4200/Dash');
    await page.getByText('President', { exact: true }).click();
    await page.locator('input[placeholder="Search President"]').fill('Adams J');
    await page.locator('input[placeholder="Search President"]').press('Enter');
    const adamsCell = page.locator('td:has-text("Adams J")').first();
    await adamsCell.click();
    await page.locator('td:has-text("1735")').click();
    await page.locator('input[placeholder="From"]').click();
    await page.locator('button:has-text("Select")').click();

    // 2. ทดสอบขนาดของกล่องข้อความ (HTML ขนาดของ input boxes)
    await page.waitForSelector('input[placeholder="Search President"]', { timeout: 15000 });
    const inputBox = page.locator('input[placeholder="Search President"]');
    await expect(inputBox).toBeVisible();
    const boundingBox = await inputBox.boundingBox();
    expect(boundingBox).not.toBeNull();
    if (boundingBox) {
        expect(boundingBox.width).toBe(150);
        expect(boundingBox.height).toBe(32);
    }

    await page.waitForSelector('input[placeholder="From"]', { timeout: 15000 });
    const fromBox = page.locator('input[placeholder="From"]');
    await expect(fromBox).toBeVisible();
    const fromBoundingBox = await fromBox.boundingBox();
    expect(fromBoundingBox).not.toBeNull();
    if (fromBoundingBox) {
        expect(fromBoundingBox.width).toBe(150);
        expect(fromBoundingBox.height).toBe(32);
    }

    await page.waitForSelector('input[placeholder="To"]', { timeout: 15000 });
    const toBox = page.locator('input[placeholder="To"]');
    await expect(toBox).toBeVisible();
    const toBoundingBox = await toBox.boundingBox();
    expect(toBoundingBox).not.toBeNull();
    if (toBoundingBox) {
        expect(toBoundingBox.width).toBe(150);
        expect(toBoundingBox.height).toBe(32);
    }

    // 3. ทดสอบสไตล์ SCSS
    const tab = page.getByRole('button', { name: 'Search' }).first();
    await expect(tab).toHaveCSS('border', '1px solid rgb(24, 144, 255)');
    const tab2 = page.locator('button:has-text("Search")').first();
    await expect(tab2).toHaveCSS('border', '1px solid rgb(24, 144, 255)');
});

// การทดสอบ Unit
test('Unit Tests for PresidentComponent', async () => {
    // Mock ของ PresidentService
    const mockPresidentService = {
        getPresidents: () => of([
            { presName: 'John Adams', birthYr: 1735, yrsServ: 8, deathAge: 90, party: 'Federalist', stateBorn: 'Massachusetts' },
            { presName: 'Thomas Jefferson', birthYr: 1743, yrsServ: 8, deathAge: 83, party: 'Democratic-Republican', stateBorn: 'Virginia' },
        ])
    };

    // สร้าง instance ของ PresidentComponent ด้วย mockPresidentService
    const component = new PresidentComponent(mockPresidentService as any);
    component.ngOnInit(); // เรียก ngOnInit เพื่อโหลดข้อมูลเริ่มต้น

    // ทดสอบการอัปเดตเวลา
    component.updateDateTime();
    expect(component.datetime).not.toBe('');

    // ทดสอบการกรองข้อมูลตามคำค้นหา
    component.searchTerm = 'Adams';
    component.onSearch();
    expect(component.filteredData.length).toBe(1);
    expect(component.filteredData[0].presName).toBe('John Adams');

    // ทดสอบการลบข้อมูล
    const originalConfirm = globalThis.confirm;
    globalThis.confirm = () => true;
    component.filteredData = [...component.presidentsData];
    component.deleteRow(0);
    expect(component.filteredData.length).toBe(1);
    expect(component.filteredData[0].presName).toBe('Thomas Jefferson');
    globalThis.confirm = originalConfirm;

    // ทดสอบการกรองข้อมูลตามช่วงอายุ
    component.presidentsData = [
        { presName: 'John Adams', birthYr: 1735, yrsServ: 8, deathAge: 90, party: 'Federalist', stateBorn: 'Massachusetts' },
        { presName: 'Thomas Jefferson', birthYr: 1743, yrsServ: 8, deathAge: 83, party: 'Democratic-Republican', stateBorn: 'Virginia' },
    ];
    component.fromAge = '1730';
    component.toAge = '1740';
    component.applyFilterByRange();
    expect(component.filteredData.length).toBe(1);
    expect(component.filteredData[0].presName).toBe('John Adams');

    // ทดสอบการตั้งค่า columns
    component.initColumns();
    expect(component.listOfColumns.length).toBeGreaterThan(0);
    expect(component.listOfColumns[0].name).toBe('Name');
    expect(component.listOfColumns[1].name).toBe('Birth Year');
});
