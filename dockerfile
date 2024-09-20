# Step 1: Build Angular app
FROM node:16.20.2 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build -- --output-hashing=none --verbose > build.log 2>&1 || (cat build.log && exit 1)

# Step 2: Set up ZAP and other dependencies
FROM ubuntu:20.04

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive
ENV ZAP_VERSION=w2024-09-17
ENV ZAP_API_KEY=r3poq3ds12b37u8899pglgee91

# Update and install necessary packages
RUN apt-get update && \
    apt-get install -y \
    curl \
    git \
    default-jdk \
    python3 \
    python3-pip \
    wget \
    unzip \
    ca-certificates \
    && apt-get clean

# Install ZAP
RUN wget https://github.com/zaproxy/zaproxy/releases/download/${ZAP_VERSION}/ZAP_WEEKLY_D-${ZAP_VERSION}.zip && \
    unzip ZAP_WEEKLY_D-${ZAP_VERSION}.zip -d /zap && \
    rm ZAP_WEEKLY_D-${ZAP_VERSION}.zip

# Add a user for Docker Hub credentials and permissions
RUN useradd -ms /bin/bash appuser
USER appuser

# Copy built Angular app from builder stage
COPY --from=builder /app/dist /app/dist

# Expose necessary ports for both Node.js and ZAP
EXPOSE 80 8081 8080

# Command to run ZAP in the background and then start the server
CMD /zap/zap.sh -daemon -config api.key=${ZAP_API_KEY} -port 8080 && npm run start
