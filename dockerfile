# Step 1: Build Angular app
FROM node:16.20.2 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build -- --output-hashing=none --verbose > build.log 2>&1 || (cat build.log && exit 1)

# Step 2: Download and install OWASP ZAP
FROM openjdk:11-jre-slim as zap
WORKDIR /zap

# Install necessary tools
RUN apt-get update && apt-get install -y wget unzip

# Download and unzip ZAP
RUN wget https://github.com/zaproxy/zaproxy/releases/download/w2024-09-17/ZAP_WEEKLY_D-2024-09-17.zip -O zap.zip
RUN unzip zap.zip -d /zap/zap_files
RUN rm zap.zip

# Check the location of zap.jar
RUN ls -R /zap/zap_files

# Step 3: Combine Angular build with ZAP and Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/build.log /usr/share/nginx/html/
COPY --from=zap /zap/zap_files /zap/zap_files

RUN apk add --no-cache openjdk11-jre

EXPOSE 80 8081

# Adjust the correct path for zap.jar based on the output of ls
CMD ["sh", "-c", "nginx -g 'daemon off;' & sleep 90 && java -jar /zap/zap_files/<correct_path>/zap.jar -cmd -quickurl http://localhost:80/ -r /zap/zap_report.html"]
