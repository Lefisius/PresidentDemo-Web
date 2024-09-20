# Start from an official Ubuntu base image
FROM ubuntu:20.04

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive
ENV NODE_VERSION=16.20.2
ENV ZAP_VERSION=2.13.0

# Update and install necessary packages
RUN apt-get update && \
    apt-get install -y \
    curl \
    git \
    npm \
    default-jdk \
    python3 \
    python3-pip \
    wget \
    unzip \
    ca-certificates \
    && apt-get clean

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@latest

# Install Super-Linter for linting
RUN npm install -g super-linter

# Install ZAP
RUN wget https://github.com/zaproxy/zaproxy/releases/download/v${ZAP_VERSION}/ZAP_${ZAP_VERSION}.zip && \
    unzip ZAP_${ZAP_VERSION}.zip -d /zap && \
    rm ZAP_${ZAP_VERSION}.zip

# Add a user for Docker Hub credentials and permissions
RUN useradd -ms /bin/bash appuser
USER appuser

# Set up working directory
WORKDIR /app

# Copy your application code into the container
COPY . .

# Install npm dependencies
RUN npm install --legacy-peer-deps

# Expose necessary ports for both Node.js and ZAP
EXPOSE 80 8081 8080

# Command to run ZAP in the background and then start Node.js server
CMD /zap/zap.sh -daemon -config api.key=$ZAP_API_KEY -port 8080 & npm run build && npm run start
