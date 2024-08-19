// notifyUser.ts
import { createTransport, SendMailOptions, SentMessageInfo } from 'nodemailer';
import { diffLines } from 'diff';
import { config } from 'dotenv';
config();

export async function notifyUser(filePath: string, oldContent: string, newContent: string, eslintErrors: string) {
    const changes = diffLines(oldContent, newContent);

    let addedLinesMessage = '';
    let removedLinesMessage = '';

    let lineNumber = 1;

    changes.forEach(part => {
        const lines = part.value.split('\n');

        if (part.added) {
            lines.forEach(line => {
                if (line.trim() !== '') {
                    addedLinesMessage += `<div style="color: green; font-family: 'Courier New', Courier, monospace;">+ Line ${lineNumber}: ${line}</div>`;
                }
                lineNumber++;
            });
        } else if (part.removed) {
            lines.forEach(line => {
                if (line.trim() !== '') {
                    removedLinesMessage += `<div style="color: red; font-family: 'Courier New', Courier, monospace;">- Line ${lineNumber}: ${line}</div>`;
                }
                lineNumber++;
            });
        } else {
            lineNumber += lines.length - 1;
        }
    });

    const message = `
        <p>โค้ดในไฟล์ <strong>${filePath}</strong> มีการแก้ไขใหม่ กรุณาเขียนสคริปต์ Playwright เพิ่มเติม.</p>

        <p>บรรทัดที่ถูกเพิ่ม:</p>
        <pre style="font-size: 14px; font-family: 'Courier New', Courier, monospace; background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
            ${addedLinesMessage}
        </pre>

        <p>บรรทัดที่ถูกลบ:</p>
        <pre style="font-size: 14px; font-family: 'Courier New', Courier, monospace; background-color: #fff0f0; padding: 10px; border-radius: 5px;">
            ${removedLinesMessage}
        </pre>

        <p>ข้อผิดพลาดที่ตรวจพบจาก ESLint:</p>
        <ul>${eslintErrors}</ul>
    `;

    console.log(message);

    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions: SendMailOptions = {
        from: process.env.EMAIL_USER,
        to: 'ditoey2002@gmail.com',
        subject: `File Change Notification: ${filePath}`,
        html: message
    };

    try {
        const info: SentMessageInfo = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.log('Error sending email:', error);
    }
}