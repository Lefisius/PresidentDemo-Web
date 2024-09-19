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

# ติดตั้ง OWASP ZAP CLI
RUN pip install owasp-zap-v2.10

# ตรวจสอบการติดตั้ง
RUN which zap-baseline.py || echo "OWASP ZAP CLI not found"

# ขั้นตอนที่ 3: รวม Angular build กับ Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/build.log /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
