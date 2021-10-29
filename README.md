#User API
This API used for authentication and user management

## Environment Setup

### Install dependencies
First install dependencies with following command
```
npm i
```

### Environment Variables
This project relies on some environment variables, To run it on your local you need to copy `.env.example` file as `.env`

### Database
This application uses Postgresql as database. If you already have one you can use it. Otherwise, you can use following command to start a new test database instance on your local.
You can set database credentials in your `.env` file

```
docker run --name local-pg-db -e POSTGRES_DB=local-db -e POSTGRES_USER=test -e POSTGRES_PASSWORD=SecretPassword59! -p 5432:5432 -d postgres
```

To create database schema, you need to run following command
```
npm run migrate
```
To seed test users, run following command
```
npm run seed
```

### Run Server
If you want to start your server on your local, run following command. It will start the server and watch for changes.
```
npm run dev
```

If you want to start the server in production mode, run following command
```
npm run start
```
