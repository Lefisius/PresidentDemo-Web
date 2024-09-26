# เลือก base image ที่ต้องการ
FROM node:16.20.2

# ตั้งค่าตำแหน่งทำงานใน container
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies โดยใช้ --legacy-peer-deps
RUN npm install --legacy-peer-deps

# คัดลอกไฟล์โค้ดทั้งหมดไปยัง container
COPY . .

# คอมไพล์หรือสร้างแอปพลิเคชัน (ถ้ามี)
RUN npm run build

# เปิดพอร์ตที่แอปพลิเคชันใช้งาน
EXPOSE 3000

# กำหนดคำสั่งเริ่มต้นเมื่อ container ทำงาน
CMD ["npm", "start"]
