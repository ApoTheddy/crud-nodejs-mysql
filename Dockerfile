FROM node:19.2-alpine3.16

# cd app
WORKDIR /app

# Dest /app
COPY  package*.json ./
COPY . . 

RUN npm install

ENV NODE_ENV=dev

EXPOSE 3000

CMD ["node","index.js"]
