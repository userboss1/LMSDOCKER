# Stage 1: Build the React App
FROM node:18-alpine as build

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and set environment for production
COPY . .
# For docker, we expect Nginx to route /api/ to the backend server container
RUN echo "VITE_API_URL=" > .env.production

# Build the frontend
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts to nginx html folder
COPY --from=build /usr/src/app/dist /var/www/lmsgrave/client/dist

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
