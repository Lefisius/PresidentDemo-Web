# Base image for Node.js to build Angular app
FROM node:16.20.2 as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./ 

# Install dependencies
RUN npm install --legacy-peer-deps 

# Copy Angular app code to working directory
COPY . . 

# Run Angular build process and log errors
RUN npm run build -- --output-hashing=none --verbose > build.log 2>&1 || (cat build.log && exit 1) 

# Base image for OWASP ZAP
FROM ubuntu:20.04 as zap

# Avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install required dependencies
RUN apt-get update && \
    apt-get install -y wget unzip openjdk-11-jdk python3 python3-pip 

# Download and install OWASP ZAP
RUN wget https://github.com/zaproxy/zaproxy/releases/download/w2024-09-17/ZAP_WEEKLY_D-2024-09-17.zip && \
    unzip ZAP_WEEKLY_D-2024-09-17.zip -d /zap && \
    ln -s /zap/ZAP_*/zap.sh /usr/local/bin/zap && \
    ln -s /zap/ZAP_*/zap-full-scan.py /usr/local/bin/zap-full-scan.py 

# Create directory for ZAP reports
RUN mkdir -p /zap/wrk 

# Base image for serving the Angular app with Nginx
FROM nginx:alpine as production

# Copy built files from the builder image to the Nginx folder
COPY --from=builder /app/dist /usr/share/nginx/html 

# Copy ZAP from zap image
COPY --from=zap /usr/local/bin/zap /usr/local/bin/zap 
COPY --from=zap /usr/local/bin/zap-full-scan.py /usr/local/bin/zap-full-scan.py 

# Copy build log for further analysis
COPY --from=builder /app/build.log /usr/share/nginx/html/ 

# Expose port 80
EXPOSE 80 

# Nginx startup command
CMD ["nginx", "-g", "daemon off;"]
