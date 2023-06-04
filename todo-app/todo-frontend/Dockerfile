FROM node:16 as ss
WORKDIR /usr/src/app
COPY . .

FROM ss as test
RUN npm ci
RUN ["npm", "run", "test"]

FROM ss as build
ENV REACT_APP_BACKEND_URL='http://localhost:8080/api/'
COPY --from=test /usr/src/app /usr/src/app
RUN npm ci --production
RUN npm run build
FROM nginx:1.20-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

