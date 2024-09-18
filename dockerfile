# ขั้นตอนที่ 1: สร้างภาพสำหรับ Angular app
FROM node:16.20.2 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build -- --output-hashing=none --verbose > build.log 2>&1 || (cat build.log && exit 1)

# ขั้นตอนที่ 2: สร้างภาพสำหรับ OWASP ZAP
FROM lefisius/dockerbuild:main
RUN apk add --no-cache wget && \
    wget https://github.com/zaproxy/zaproxy/releases/download/v2.11.0/ZAP_2.11.0_Docker.tar.gz && \
    tar -xzf ZAP_2.11.0_Docker.tar.gz -C /zap && \
    rm ZAP_2.11.0_Docker.tar.gz
WORKDIR /zap
COPY . /zap
ENTRYPOINT ["/zap/zap.sh"]
EXPOSE 8080

# ขั้นตอนที่ 3: รวม Angular build กับ Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/build.log /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
