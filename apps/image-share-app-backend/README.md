<p align="center">
  <a href="https://devopscycle.com">
    <img target="_blank" height="100" src="http://devopscycle.com/wp-content/uploads/sites/4/2023/10/DevOps-Cycle-Logo-Long.png" />
  </a>
</p>

# Image Share App Backend

> This is the central backend application for the Photo Share App system

## Prerequisites

* [Docker Desktop][docker_desktop]
* [Node.js v18.16.0][nodejs]

## Install

```sh
# cd into workdir (directory where the package.json is located)
$ npm i
```

## Start Development

In this section we will explain how you can start the database and the application.

### Start the Database

First you need to start the database. Make sure Docker desktop is up and running. Run the follwing command to start the database:

```sh
# cd into workdir (directory where the docker-compose.yaml is located)
# older versions of docker have docker compose in a seperate cli (docker-compose)
$ docker compose up --detach
```

### Start the Backend Application

In a seperate terminal run the following to start the backend application:

```sh
# cd into workdir (directory where the package.json is located)
$ npm run start:dev
```

### Stop the Database

```sh
# older versions of docker have docker compose in a seperate cli (docker-compose)
$ docker compose down
```

### Stop the Backend Application

click CTRL+C to abort the process

## Build for Production

```sh
# cd into workdir (directory where the package.json is located)
$ npm run build
```
## Start Production Build

Make sure to create a .env file for all environment variables or pass them directly via the cli cmd.

```sh
# cd into workdir (directory where the package.json is located)
$ npm start
```
### Migrate the DB

> Note: do not use **Models** in migrations! Always use the queryInterface!

When you start the DB for the first time or there was a change in the DB schema (new tables, new fields, deleted fields, etc...) you need to migrate.

#### Run up migrations

Locally

```sh
# apply all new migrations that are not yet applied onto the DB
$ npm run migrate:dev
```

Production (this requires the build server)

> Note: This needs a NODE_ENV otherwise the DB connection can not established. This is throughout all stages commonly used with NODE_ENV=production

```sh
# the next command is using the build output e.g. js files instead of ts files as in development mode
$ npm run build:server
# apply all new migrations that are not yet applied onto the DB
$ npm run migrate
```

#### Run down migrations

> Note: we usually do not revert in production, so down migrations only applied in development mode

Locally

```sh
# revert the single latest migration (last change in DB)
$ npm run migrate:down:dev:one
# revert all migration (empty DB)
$ npm run migrate:down:dev:all
```

#### Create migration

> Note: **Always give a migration the postfix .migration.ts, in that way it is easier to read weather it is a seed or a migration as the DB uses the same table for seeds and migrations!**

```sh
# a new table
$ npm run create-migration -- initial-xxx-table.migration.ts
# or a new field
$ npm run create-migration -- add-xxx-to-xxx-table.migration.ts
# or a remove a field
$ npm run create-migration -- remove-xxx-from-xxx-table.migration.ts
# or changed data
$ npm run create-migration -- changed-value-xxx-from-xxx-to-xxx-in-xxx-table.migration.ts
```

##### Why is changng production data considered a migration and not a seed?

When something chanes in the production data, this is considered a change in our DB model, since it effects real users. Seeds are only test data, and test data should never reside in a production DB. Data that is inside of a production DB and is used for test purposes but is not deleted is considered abandoned real data. To minimize abandoned data within the production database, every test data should be deleted after the tests. This does not include event storage, logs or traces.

### Seed the DB

> Note: do not use **Models** in seeds! Always use the queryInterface!

When you start the local DB for the first time there is no content inside of it, so we run seeders to populate our local DB.

#### Run up seeders

> Note: we do not use seeds for production, when we add values in the db that should be persisted inside the production DB it is considered a **migration**!

Locally

```sh
# apply all new seeds that are not yet applied onto the DB
$ npm run seed:dev
```

#### Run down seeders

> Note: we do not use seeds for production, when we add values in the db that should be persisted inside the production DB it is considered a **migration**!

Locally

```sh
# revert the single latest seeder (last change in DB)
$ npm run seed:down:dev:one
# revert all seeders (empty DB)
$ npm run seed:down:dev:all
```

#### Create seeds

> Note: **Always give a seed the postfix .seed.ts, in that way it is easier to read weather it is a seed or a migration as the DB uses the same table for seeds and migrations!**

```sh
# add initial data (usually called after the model)
$ npm run create-seed -- initial-xxx.seed.ts
# update data in existing seeds
$ npm run create-seed -- update-xxx-in-xxx.seed.ts
# remove data from the seeds
$ npm run create-seed -- remove-xxx.seed.ts
```

### Default User in Dev Mode

email: admin@admin.admin
password: 1234

email: user@user.user
password: 1234

### Common Errors

Overview of common errors that are easy to solve.

#### While running seeds deadlock is detected

> Note: **This will only happen when you run all seeds at once up or down**

To solve this issue, rerun the command.

Either one of:

```sh
$ npm run migrate:dev
$ npm run migrate:dev:down:all
$ npm run seed:dev
$ npm run seed:dev:down:all
```

#### DB is not starting

> Note: **This is only meant for development on the local machine**

```sh
# find the containers associated with the db and rm them
$ docker ps
# remove docker containers
$ docker stop <container-id>
$ docker rm <container-id>
# find volumes associated with the db and rm them
$ docker volume ls
$ docker rm <volume-id>
```

When you restart the DB, you need to run the migrations and seeds again.

## LICENSE

MIT @ Lukas Aichbauer

[docker_desktop]: https://www.docker.com/products/docker-desktop/
[nodejs]: https://nodejs.org/en/