# nodejs-todo

## A simple To Do List application built with Node.js and Express

A Node.js application that let's you add and complete tasks on a single page, storing them in a Mongo database. This appllication makes use of:

* **EJS** - A simple templating engine that lets you generate HTML markup with plain JS
* **body-parser** - An Express middleware that extracts the entire body portion of an incoming request stream and exposes it on `req.body`

---

## Running the app locally

- Run `npm install` to install all the needed dependencies
- Configure your environment by setting the following variables
  ```bash
  export MONGO_USER="..."
  export MONGO_PASS="..."
  export MONGO_HOST="localhost"
  export MONGO_PORT="27017"
  ```
  or simply copy the `.env.example` file to a new file called `.env` and adjust the values in that file
- *[OPTIONAL]* - Start a local instance of MongoDB by running
  ```bash
  docker compose -f ./docker/docker-compose.yml --project-directory . up
  ```
- Start the server using `npm run start:server`
- Start the client using `npm run start:client`
- Navigate to `http://localhost:3000/` to view the app in dev mode, with hot HMR enabled

---

## Build the app

- Perform the setup as above
- Build the React app using `npm run build`
- Start the server using `npm run start:server`
- Navigate to `http://localhost:4000/` to view the production version of the React app, served by Express
