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

# Base image for OWASP ZAP
FROM ubuntu:20.04 as zap

# Set environment variable to avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt-get update && \
    apt-get install -y wget unzip openjdk-11-jdk python3 python3-pip

# Download and install OWASP ZAP
RUN wget https://github.com/zaproxy/zaproxy/releases/download/w2024-09-17/ZAP_WEEKLY_D-2024-09-17.zip && \
    unzip ZAP_WEEKLY_D-2024-09-17.zip -d /zap && \
    ln -s /zap/ZAP_*/zap.sh /usr/local/bin/zap && \
    ln -s /zap/ZAP_*/zap-full-scan.py /usr/local/bin/zap-full-scan.py

# Create directory for reports
RUN mkdir -p /zap/wrk

# Default command to run OWASP ZAP
CMD ["python3", "/usr/local/bin/zap-full-scan.py"]
