FROM mhart/alpine-node:10
WORKDIR /usr/src
COPY package-lock.json package.json ./
RUN npm install
COPY . .
RUN npm run build && rm build/static/js/*.map && mv build /public
