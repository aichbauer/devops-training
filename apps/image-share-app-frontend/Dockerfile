# this is a multistage docker image
# with multistage we can use
# fat base images without manually installing build dependencies for building apps
# and use the build output of fat images in our slim images
# no unnecessary dependencies and binaries in the runtime docker image
# first stage => build
# second stage => serve
# use the node as base image
# we name it build
FROM node:18.16.0 as build

# in the image create a folder called /app
# switch to that directory to make it the cwd (current work directory)
WORKDIR /app

# COPY from HOST to IMAGE
# copy packag.json and package-lock.json to the cwd in the image
# which is app
COPY package*.json .

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
ARG BASE_API_URL=http://localhost:3000
ARG BASE_APP_URL=http://localhost:1234
# ENV value is available at run time
ENV NODE_ENV=$NODE_ENV
ENV BASE_API_URL=$BASE_API_URL
ENV BASE_APP_URL=$BASE_APP_URL

RUN echo $NODE_ENV
RUN echo $BASE_API_URL
RUN echo $BASE_APP_URL


# build our application
# the build output will be in /app/dist/webapp
RUN npm run build

# second stage
# slim nginx base image named as serve
FROM nginx:1.19.10-alpine as serve

# we can now copy things from the first stage to the second
# we copy the build output to directory where nginx serves files
COPY --from=build /app/dist/webapp /var/www
# we overwrite the default config with our own
# here we only use the port 80
# in production, you would most likly also want to make sure
# all requests even in your internal network or kubernetes cluster
# is served via https when dealing with sensible data
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

# does nothing
# this is documentation so that we know which port is used for that image
EXPOSE 80

# For Docker containers (or for debugging),
# the daemon off; directive tells Nginx to stay in the foreground.
# For containers this is useful as best practice is for one container = one process.
# One server (container) has only one service.
CMD ["nginx", "-g", "daemon off;"]
