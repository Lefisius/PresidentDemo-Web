import { test, expect } from '@playwright/test';


test('ทดสอบขนาดของกล่องข้อความ', async ({ page }) => {
    await page.goto('http://localhost:4200/President');

    const inputBox = page.getByPlaceholder('Search President');

    // ตรวจสอบว่าองค์ประกอบมีอยู่และมองเห็นได้
    await expect(inputBox).toBeVisible();

    // ดึงข้อมูล bounding box
    const boundingBox = await inputBox.boundingBox();

    // ตรวจสอบว่า boundingBox ไม่ใช่ null
    expect(boundingBox).not.toBeNull();

    if (boundingBox) {
        expect(boundingBox.width).toBe(150);
        expect(boundingBox.height).toBe(32);
    }

    const inpuBox = page.getByPlaceholder('From');

    // ตรวจสอบว่าองค์ประกอบมีอยู่และมองเห็นได้
    await expect(inputBox).toBeVisible();

    // ดึงข้อมูล bounding box
    const boundinBox = await inpuBox.boundingBox();

    // ตรวจสอบว่า boundingBox ไม่ใช่ null
    expect(boundinBox).not.toBeNull();

    if (boundinBox) {
        expect(boundinBox.width).toBe(150);
        expect(boundinBox.height).toBe(32);
    }

    const inpBox = page.getByPlaceholder('To');

    // ตรวจสอบว่าองค์ประกอบมีอยู่และมองเห็นได้
    await expect(inpBox).toBeVisible();

    // ดึงข้อมูล bounding box
    const boundiBox = await inpBox.boundingBox();

    // ตรวจสอบว่า boundingBox ไม่ใช่ null
    expect(boundiBox).not.toBeNull();

    if (boundiBox) {
        expect(boundiBox.width).toBe(150);
        expect(boundiBox.height).toBe(32);
    }

});

test('ทดสอบสไตล์ SCSS ของหน้าจัดการคลังพัสดุ', async ({ page }) => {
    await page.goto('http://localhost:4200/President');

    const tab = page.getByRole('button', { name: 'Search' }).first();
    await expect(tab).toHaveCSS('border', '1px solid rgb(24, 144, 255)');

    const tab2 = page.locator('button').filter({ hasText: /^Search$/ });
    await expect(tab2).toHaveCSS('border', '1px solid rgb(24, 144, 255)');

});