# The first FROM is now a stage called build-stage
FROM node:16

WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci 

ENV DEBUG=todo-backend-prod:*

USER node

CMD ["npm", "start"]
