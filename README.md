
## News Aggregator

Welcome to the take-home challenge for the Frontend web developer position. We are excited to see your skills and experience in action. The challenge is to create the user interface for a news aggregator website that pulls articles from various sources and displays them in a clean, easy-to-read format.

### Requirements:

1. **Article search and filtering**: Users should be able to search for articles by keyword and filter the results by date, category, and source.
2. **Personalized news feed**: Users should be able to customize their news feed by selecting their preferred sources, and categories.
3. **Mobile-responsive design**: The website should be optimized for viewing on mobile devices.

### Containerizing the News Aggregator Frontend Application with Docker:

To containerize the news aggregator frontend application on Docker, follow these steps:

1. **Create Dockerfile**:
   Create a Dockerfile in the root of your application directory. You can use the following Dockerfile:

   ```Dockerfile
   # Use Node.js LTS version as the base image
   FROM node:18-alpine

   # Set the working directory in the container
   WORKDIR /app

   # add `/app/node_modules/.bin` to $PATH
   ENV PATH /app/node_modules/.bin:$PATH

   # Copy package.json and package-lock.json (if present) to the container
   COPY package*.json ./

   # Copy the yarn.lock file
   COPY yarn.lock ./

   # Install dependencies
   RUN yarn install

   # Copy the entire project to the container
   COPY . ./

   # Start the nginx server
   CMD ["yarn", "start"]

   # Expose port 3000
   EXPOSE 3000
   ```

2. **Build the Docker image**:
   Open a terminal, navigate to the directory where your Dockerfile is located, and run the following command to build the Docker image:

   ```
   docker build -t news-aggregator .
   ```

3. **Run the Docker container**:
   Once the Docker image is built, you can run a container based on that image using the following command:

   ```
   docker run -dp 127.0.0.1:3000:3000 news-aggregator
   ```

   This command runs the Docker container in detached mode (`-d`), exposing port 3000 on your host machine and mapping it to port 3000 in the container.

4. **Access your React application**:
   You can now access your React application by opening a web browser and navigating to `http://localhost:3000`.

