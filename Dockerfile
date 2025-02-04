# Use the official Node.js image from Docker Hub
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the app
COPY . .

# Install dependencies
RUN yarn install

# Build app
RUN yarn build

# Run database migrations
# RUN yarn database:migrate

# Expose the port that your app runs on (Heroku uses dynamic ports)
# EXPOSE 3333

# Set the start command for the container
CMD ["sh", "-c", "yarn database:migrate && yarn run:production"]