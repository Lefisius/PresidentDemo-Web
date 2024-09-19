# ขั้นตอนที่ 1: สร้างภาพสำหรับ Angular app
FROM node:16.20.2 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build -- --output-hashing=none --verbose > build.log 2>&1 || (cat build.log && exit 1)

# ขั้นตอนที่ 2: สร้างภาพสำหรับ OWASP ZAP
FROM python:3.11-slim as zap
WORKDIR /zap

# ดาวน์โหลดและติดตั้ง OWASP ZAP
RUN apt-get update && apt-get install -y wget unzip
RUN wget https://github.com/zaproxy/zaproxy/releases/download/w2024-09-17/ZAP_WEEKLY_D-2024-09-17.zip -O zap.zip
RUN unzip zap.zip
RUN rm zap.zip

# ตรวจสอบการติดตั้ง
RUN ls -l zap/zap.jar || true

# ขั้นตอนที่ 3: รวม Angular build กับ Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/build.log /usr/share/nginx/html/
COPY --from=zap /zap /zap
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
