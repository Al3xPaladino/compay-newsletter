# /microservices/user-service/Dockerfile
FROM node:14
WORKDIR /src/app
RUN apt-get update && apt-get install -y netcat && apt-get install -y build-essential && apt-get install -y python && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "src/index.js"]
