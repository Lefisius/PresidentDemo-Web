import { exec } from 'child_process';

// ฟังก์ชันสำหรับการเรียกใช้ ESLint
export function runESLint(filePath: string): Promise<{ filePath: string, errors: string[] }> {
    return new Promise((resolve, reject) => {
        exec(`npx eslint ${filePath}`, (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
                return;
            }

            const errors = stdout.split('\n').filter(line => line.includes('error'));
            resolve({ filePath, errors });
        });
    });
}
