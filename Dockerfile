# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Create a non-root user to run the application
RUN addgroup -g 1001 -S nodejs && \
    adduser -S praisedle -u 1001

# Copy the rest of the application code
COPY --chown=praisedle:nodejs . .

# Switch to the non-root user
USER praisedle

# Expose the port the app runs on
EXPOSE 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Define the command to run the application
CMD ["npm", "start"] 