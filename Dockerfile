FROM mhart/alpine-node:10
WORKDIR /usr/src
COPY package-lock.json package.json ./
RUN npm install
COPY . .
RUN npm build && mv build /public
