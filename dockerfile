# Step 1: Build Angular app
FROM node:16.20.2 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build -- --output-hashing=none --verbose > build.log 2>&1 || (cat build.log && exit 1)

# Step 2: Set up Nginx to serve the Angular app
FROM ubuntu:20.04

# Update and install necessary packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    nginx curl && \
    rm -rf /var/lib/apt/lists/*

# Copy built Angular app from builder stage to Nginx HTML directory
COPY --from=builder /app/dist /var/www/html

# Expose port 80 for Nginx
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
