# ขั้นตอนที่ 1: สร้างภาพสำหรับ Angular app
FROM node:16.20.2 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build -- --output-hashing=none --verbose > build.log 2>&1 || (cat build.log && exit 1)

# ขั้นตอนที่ 2: สร้างภาพสำหรับ OWASP ZAP
FROM openjdk:11-jre-slim as zap
WORKDIR /zap

# ดาวน์โหลดและติดตั้ง OWASP ZAP
RUN apt-get update && apt-get install -y wget unzip
RUN wget https://github.com/zaproxy/zaproxy/releases/download/w2024-09-17/ZAP_WEEKLY_D-2024-09-17.zip -O zap.zip
RUN unzip zap.zip
RUN rm zap.zip

# ขั้นตอนที่ 3: รวม Angular build กับ ZAP และ Nginx
FROM nginx:alpine

# คัดลอกไฟล์ที่สร้างจากขั้นตอนก่อนหน้า
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/build.log /usr/share/nginx/html/
COPY --from=zap /zap /zap

# ติดตั้ง Java ที่จำเป็นสำหรับ ZAP
RUN apk add --no-cache openjdk11-jre

EXPOSE 80 8081

# สคริปต์สำหรับการเริ่มต้น
CMD ["sh", "-c", "nginx -g 'daemon off;' & sleep 30 && java -jar /zap/zap.jar -cmd -quickurl http://localhost:80/ -r /zap/zap_report.html"]
