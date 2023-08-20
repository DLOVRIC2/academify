# Node image
FROM node:18.17.1-alpine3.18

# Create working directory
WORKDIR /frontend

# Copy and install app dependencies
COPY package*.json .
RUN npm install

# Copy the rest of the files
COPY . .

# Expose port 3000 for the frontend
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
