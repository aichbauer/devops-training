# singlestage docker image
# we use a slim base image
# no unnecessary dependencies and binaries in the runtime docker image
FROM node:18.16.0-alpine

# in the image create a folder called /app
# switch to that directory to make it the cwd (current work directory)
WORKDIR /app

# COPY from HOST to IMAGE
# copy packag.json and package-lock.json to the cwd in the image
# which is app
COPY package*.json ./

# clean install
# same as npm install but meant for automated environments
# needs an package-lock.json
# if the NODE_ENV is set to production it will not install development dependencies
# since this is only the build step we need the dependencies from
RUN npm ci

# COPY from HOST to IMAGE
# copy the whole directory to the image's cwd
# excluding .dockerignore
COPY . .

# ARG value is available at build time
ARG NODE_ENV=production
# ENV value is available at run time
ENV NODE_ENV=$NODE_ENV

# build (transpile from ts to js) our application
# the build output will be in /dist
RUN npm run build

COPY ./src/db/certs ./dist/db/certs

# does nothing
# this is documentation so that we know which port is used for that image
EXPOSE 3000
# does nothing
# this is documentation so that we know which port is used for that image
EXPOSE 3001

# starts the node server
# node ./dist/server.js
CMD npm start
