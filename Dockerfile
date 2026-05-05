FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying package files first
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]