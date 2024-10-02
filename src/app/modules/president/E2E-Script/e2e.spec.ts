import { test, expect, Page } from '@playwright/test';
import sharp from 'sharp';
import fs from 'fs';

// ฟังก์ชันในการแคปเจอร์ภาพหน้าจอและวาดวงกลมบนจุดที่มีปัญหา
async function captureScreenshotWithCircle(page: Page, circleX: number, circleY: number) {
    const screenshotPath = 'screenshots/failure.png';
    await page.screenshot({ path: screenshotPath });
    console.log('Screenshot taken at:', screenshotPath);

    const circleDiameter = 100;

    const imageBuffer = fs.readFileSync(screenshotPath);

    await sharp(imageBuffer)
        .composite([{
            input: Buffer.from(`
                <svg width="${page.viewportSize()?.width}" height="${page.viewportSize()?.height}">
                    <circle cx="${circleX}" cy="${circleY}" r="${circleDiameter / 2}" stroke="red" stroke-width="5" fill="none" />
                </svg>
            `),
            blend: 'over'
        }])
        .toFile('screenshots/failure_with_circle.png')
        .then(() => console.log('Circle drawn on screenshot successfully.'))
        .catch(err => console.error('Error processing screenshot with Sharp:', err));
}

// ฟังก์ชันสำหรับการตรวจสอบปุ่มและวาดวงกลมถ้ามีข้อผิดพลาด
async function checkButtonAndDrawCircle(page: Page, button: any, expectedBorder: string) {
    let circleX, circleY;

    try {
        await expect(button).toHaveCSS('border', expectedBorder);
    } catch (error) {
        console.error('เกิดข้อผิดพลาดที่ปุ่ม:', error);

        const boundingBox = await button.boundingBox();
        if (boundingBox) {
            circleX = boundingBox.x + boundingBox.width / 2;
            circleY = boundingBox.y + boundingBox.height / 2;
            await captureScreenshotWithCircle(page, circleX, circleY);
        }

        throw error; 
    }
}

test('ทดสอบการแคปเจอร์หน้าจอพร้อมวงกลม', async ({ page }) => {
    await page.goto('http://localhost:4200/President');

    const searchButton = page.getByRole('button', { name: 'Search' }).first();
    const tab2 = page.locator('button').filter({ hasText: /^Search$/ });

    // ตรวจสอบทั้งสองปุ่ม
    await checkButtonAndDrawCircle(page, searchButton, '1px solid rgb(24, 144, 255)');
    await checkButtonAndDrawCircle(page, tab2, '1px solid rgb(24, 144, 255)');
});
