// runESLint.ts
import { ESLint } from 'eslint';

export async function runESLint(filePath: string): Promise<string> {
    const eslint = new ESLint();
    const results = await eslint.lintFiles([filePath]);
    
    let eslintErrors = '';
    for (const result of results) {
        for (const message of result.messages) {
            if (message.severity === 2) { // 2 = Error
                eslintErrors += `<li>${message.line}:${message.column} ${message.message} (${message.ruleId})</li>`;
            }
        }
    }
    
    return eslintErrors;
}