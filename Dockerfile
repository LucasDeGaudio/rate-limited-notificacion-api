#DEV STAGE
FROM node:16 as base
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci
COPY src ./src

CMD [ "npm", "run", "watch" ]

EXPOSE 8080
