# Use a Node.js LTS version
FROM node:20-slim

#Set the working directory
WORKDIR /app

# Copy packages files and install dependencies
COPY packages*.json ./
RUN npm install

# Copy the rest of the server code
COPY . .

# Build the Typescript code
RUN npm run build

#Expose the port out Express server runs on
EXPOSE 3000

#Start the server
CMD ["npm", "start"]
