// generatePlaywrightScript.ts
import * as fs from 'fs';
import * as path from 'path';

// ฟังก์ชันสำหรับการสร้างสคริปต์ Playwright
export function generatePlaywrightScript(filePath: string) {
    const scriptTemplate = `
        import { test, expect } from '@playwright/test';

        test('test for ${path.basename(filePath)}', async ({ page }) => {
            await page.goto('https://example.com');
            // เขียนสคริปต์เพิ่มเติมที่นี่
        });
    `;

    // สร้างโฟลเดอร์สำหรับเก็บสคริปต์ทดสอบ
    const testsFolder = path.join('./tests');
    if (!fs.existsSync(testsFolder)) {
        fs.mkdirSync(testsFolder);
    }

    // กำหนดตำแหน่งและชื่อไฟล์สำหรับสคริปต์ Playwright
    const scriptPath = path.join(testsFolder, `${path.basename(filePath, '.ts')}.spec.ts`);
    fs.writeFileSync(scriptPath, scriptTemplate);
    console.log(`Playwright script generated at ${scriptPath}`);
}
