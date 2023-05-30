## POC Ecommerce NestJS with GraphQL

## Technologies
- NestJS
- MongoDB
- Mongoose
- Docker
- Docker compose
- JWT
- Passport
- GraphQL


## Installation

```bash
# Copy .env.example .env
$ cp .env.example .env
```

```bash
$ yarn install
```

## Running the app with Docker

```bash
# Run docker
$ docker compose up -d
```

## Running the app without Docker

- In the `docker-compose.yml` file comment in the `ecommerce-api` service block
- in the `.env` file change `mongodb://mongo:27017/ecommerce` to `mongodb://localhost:27017/ecommerce`
```bash
# Run docker
$ docker compose up -d


# watch mode
$ yarn run start:dev

```
