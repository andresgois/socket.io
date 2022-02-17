FROM node:14.18-alpine

ARG APP=app
ARG HOME=/home/node

RUN mkdir -p ${HOME}/${APP}

COPY package*.json ./

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

WORKDIR ${HOME}/${APP}

USER node

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]