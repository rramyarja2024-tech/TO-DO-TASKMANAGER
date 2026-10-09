
# Use Node.js
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy project files
COPY . .

# Application port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]

