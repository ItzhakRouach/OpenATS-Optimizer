# Use a Node.js LTS version
FROM node:20-slim

#Set the working directory
WORKDIR /app

# Copy packages files and install dependencies
COPY packages*.json ./
RUN npm install

# Copy the rest of the server code
COPY . .
RUN npm run build


# Production stage: Use Nginx to serve the static files
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

#Expose the port for the frontend
EXPOSE 80

#Start the server
CMD ["nginx", "-g", "daemon off;"]