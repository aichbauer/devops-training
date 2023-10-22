<p align="center">
  <a href="https://devopscycle.com">
    <img target="_blank" height="100" src="http://devopscycle.com/wp-content/uploads/sites/4/2023/10/DevOps-Cycle-Logo-Long.png" />
  </a>
</p>

# Share Image App Frontend

> This is the frontend for the share image app

# Table of Contents

* [Prerequisites](#prerequisites)
* [Install](#install)
* [Start Development](#start-development)
  * [Stop Development](#start-development)
* [Build for Production](#build-for-production)

## Prerequisites

* [Node.js v18.16.0][nodejs]

## Install

```sh
# cd into workdir (directory where the package.json is located)
$ npm i
```

## Start Development

In this section we will explain how you can start the application.

### Start the Frontend Application

In a terminal run the following to start the frontend application:

```sh
# cd into workdir (directory where the package.json is located)
$ npm run start:dev
```

### Stop the Frontend Application

click CTRL+C to abort the process

## Build for Production

You need to provide a .env file for the environment variables on build time!

```sh
# cd into workdir (directory where the package.json is located)
$ npm run build
```

## Start the Production Build

You need to provide a .env file for the environment variables on run time!

```sh
# cd into workdir (directory where the package.json is located)
$ npm run start
```

## LICENSE

MIT @ Lukas Aichbauer

[nodejs]: https://nodejs.org/en/
