FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL='http://localhost:5000'

RUN npm ci

RUN npm run build

#RUN npm run test

RUN npm install -g serve
CMD ["serve", "build"]

