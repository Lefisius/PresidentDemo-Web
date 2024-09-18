# เลือกฐานข้อมูลของภาพเริ่มต้นที่มี Node.js สำหรับการ build แอป Angular
FROM node:16.20.2 as builder

# ตั้งค่าโฟลเดอร์ทำงาน
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json เข้าไปยังโฟลเดอร์ทำงาน
COPY package*.json ./

# ติดตั้ง dependencies โดยใช้ npm
RUN npm install --legacy-peer-deps

# คัดลอกโค้ด Angular app เข้าไปยังโฟลเดอร์ทำงาน
COPY . .

# ปรับปรุงการรันคำสั่ง npm run build ให้มีการรายงานข้อผิดพลาด
RUN npm run build -- --output-hashing=none --verbose > build.log 2>&1 || (cat build.log && exit 1)

# ขั้นตอนการสร้างภาพ Docker สำหรับ production ด้วย Nginx
FROM nginx:alpine as production

# คัดลอกไฟล์ build จากภาพ builder มายังโฟลเดอร์ที่เหมาะสมใน Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# คัดลอกไฟล์ log ของการ build มาด้วย
COPY --from=builder /app/build.log /usr/share/nginx/html/

# Expose port 80 to the outside world
EXPOSE 80

# คำสั่งเริ่มต้นของ Nginx เมื่อ container ถูกเรียกใช้
CMD ["nginx", "-g", "daemon off;"]

# ติดตั้ง OWASP ZAP บน Alpine Linux
FROM owasp/zap2docker-stable as zap

# คัดลอกไฟล์จาก production stage มายัง OWASP ZAP stage
COPY --from=production /usr/share/nginx/html /usr/share/nginx/html

# ตั้งค่า default command ให้เป็นการรัน OWASP ZAP
CMD ["zap-full-scan.py", "-t", "http://localhost:80", "-J", "/zap/wrk/report_json.json", "-r", "/zap/wrk/report_html.html"]
