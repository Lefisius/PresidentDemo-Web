import * as fs from 'fs';
import * as path from 'path';

export function generatePlaywrightScript(filePath: string, functionName: string): string {
    const newScriptTemplate = `
        test('test for ${functionName} in ${path.basename(filePath)}', async ({ page }) => {
            await page.goto('https://localhost4200/Dash');
            // Add more test steps here
        });
    `;

    // Determine the parent directory of the component directory
    const componentDir = path.dirname(filePath);
    const parentDir = path.dirname(componentDir);

    // Create the E2E-Script folder one level above the component directory
    const e2eDir = path.join(parentDir, 'E2E-Script');

    if (!fs.existsSync(e2eDir)) {
        fs.mkdirSync(e2eDir);
    }

    // Create the scriptPath with the name of the component's .spec.ts file
    const scriptPath = path.join(e2eDir, `${path.basename(componentDir)}.spec.ts`);

    if (fs.existsSync(scriptPath)) {
        const existingContent = fs.readFileSync(scriptPath, 'utf-8');

        if (existingContent.includes(`test for ${functionName}`)) {
            console.log(`Test for function ${functionName} already exists in ${scriptPath}.`);
        } else {
            const updatedContent = existingContent + `\n${newScriptTemplate.trim()}`;
            fs.writeFileSync(scriptPath, updatedContent);
            console.log(`Appended new test for function ${functionName} in ${scriptPath}.`);
        }
    } else {
        const scriptTemplate = `
            import { test, expect } from '@playwright/test';

            ${newScriptTemplate.trim()}
        `;
        fs.writeFileSync(scriptPath, scriptTemplate.trim());
        console.log(`Generated new Playwright script: ${scriptPath}`);
    }

    return scriptPath;
}
