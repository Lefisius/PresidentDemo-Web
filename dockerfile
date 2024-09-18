# ขั้นตอนที่ 1: สร้างภาพสำหรับ Angular app
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

# ขั้นตอนที่ 2: สร้างภาพสำหรับ OWASP ZAP
FROM lefisius/dockerbuild:main

# ติดตั้ง OWASP ZAP
RUN apk add --no-cache wget && \
    wget https://github.com/zaproxy/zaproxy/releases/download/v2.11.0/ZAP_2.11.0_Docker.tar.gz && \
    tar -xzf ZAP_2.11.0_Docker.tar.gz -C /zap && \
    rm ZAP_2.11.0_Docker.tar.gz

# ตั้งค่า working directory สำหรับ ZAP
WORKDIR /zap

# คัดลอกไฟล์สคริปต์การสแกนของคุณ (ถ้ามี)
COPY . /zap

# กำหนด entrypoint
ENTRYPOINT ["/zap/zap.sh"]

# Expose port ที่ ZAP ใช้งาน (ตามปกติคือ 8080)
EXPOSE 8080

# ขั้นตอนที่ 3: การรวม Nginx และไฟล์ Angular build
# ใช้ภาพพื้นฐาน Nginx
FROM nginx:alpine

# คัดลอกไฟล์ build จากภาพ builder มายังโฟลเดอร์ที่เหมาะสมใน Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# คัดลอกไฟล์ log ของการ build มาด้วย
COPY --from=builder /app/build.log /usr/share/nginx/html/

# Expose port 80 to the outside world
EXPOSE 80

# คำสั่งเริ่มต้นของ Nginx เมื่อ container ถูกเรียกใช้
CMD ["nginx", "-g", "daemon off;"]
