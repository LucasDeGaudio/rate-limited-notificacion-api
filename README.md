# rate-limited-notificacion-api

### Application:

This application protect recipients from getting too many emails by implementing a rate-limited version of Notification Service.

### Requirements:

- NodeJS >= 16.14 (tested in 16.14)
- Docker (tested in 4.15.0 )

### Considerations before running the application:

The application runs on port 8000. You can modify the port binding in the `docker-compose.yml` file.

Postgres runs on port 5432 (the port is bound to the host port in case you want to inspect the db from a client, but it's not necessary for the app to work). If there is a conflict, modify or remove the port in the `docker-compose.yml` file (`ports` property in redis section).

### Steps to run:

1. Clone the repository locally: `git clone https://github.com/LucasDeGaudio/rate-limited-notificacion-api`
2. Go to the project directory: `cd rate-limited-notificacion-api`
3. Run the `npm run dev` command
4. When finished, you can verify that the containers are running with the `docker ps` command
5. Run curl in console or postman:
   curl --location --request POST 'http://localhost:8000/notify' \
   --header 'Content-Type: application/json' \
   --data-raw '{
   "type": "Marketing",
   "email": "test1@test.com",
   "message": "New Arrival!"
   }'

   - types availables: Status-News-Update-Marketing

### Useful commands:

To view the application logs, use `docker logs rate_limited_app`. Note: `rate_limited_app` is the name that Docker will use for the container that runs the application, if the command does not work, find out the id or name of the container using `docker ps` and replace in the command `docker logs <containerId|containerName> `.

### Application:

The application is made up of an API and a relational database [POSTGRES].

The API is developed in Typescript, using express.

Postgres is used to store information about the history of notifications sent.

Initial Configuration for Notification types (src/constants/configuration.ts):

Status: {
minutes: 1,
hours: 2,
days: 5,
},
News: {
minutes: 1,
hours: 5,
days: 10,
},
Update: {
minutes: 1,
hours: 1,
days: 1,
},
Marketing: {
minutes: 3,
hours: 6,
days: 9,
}

### Testing:

1. Run the `npm i` command
2. Run the `npm run test` command

The application has the following coverage tresholds percentage:

- branches: 90
- functions: 90
- lines: 90
- statements: 90
