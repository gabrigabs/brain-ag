# Rural Producer API

<p>
<img  align="left" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /><img  align ="left" src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" /><img align="left" src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" /><img align ="left" src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" /><img align="left" src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"/>
</p>
<p></p>
An API that can manage rural producers farm data and also obtain detailed data with statistics on their farms

## Table of Contents

- [Overview](#overview)
- [Deployment](#deployment)
- [Requirements](#requirements)
- [Documentation](#documentation)
- [Installation](#authentication)
- [Running the API](#running-the-api)
- [Testing](#testing)

## Overview

The Rural Producer API is a RESTful API designed to manage rural producers and their associated data. The API provides a set of endpoints for creating, reading, updating, and deleting rural producer data and a endpoint that returns statistics off all rural producers farms.

## Deployment

[![Deployed to AWS](https://img.shields.io/badge/Deployed%20to-AWS-430098.svg)](http://ec2-98-81-115-106.compute-1.amazonaws.com/docs)

This application is deployed to AWS. You can access the live application [here](http://ec2-98-81-115-106.compute-1.amazonaws.com/docs).

## Requirements

### Obrigatory

- Node.js
- NPM
- Postgres SQL

### Optional

- Docker

## Documentation

This API is documented using Swagger. You can find the API documentation at /docs endpoint at your localhost instance or view the docs on our deployment [here](http://ec2-98-81-115-106.compute-1.amazonaws.com/docs).

## Installation

- Setup your postgres instance, you can use the docker-compose file if you dont have one, just set your username, password and database name and run the compose command:

```bash
$ docker-compose up -d
```

- Configure your enviroment file using .env.example file as example to setup your postgres configuration like this:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
```

- Install the API packages using the NPM install command:

```bash
$ npm install
```

- Setup the postgres database with prisma migrations

```bash
$ npx prisma migrate dev --name init
```

Once the installation is complete, you can run the application locally and execute unit tests.

## Running Api

Now you can start application with:

```bash
$ npm run start
```

And run application in dev mode with:

```bash
$ npm run start:dev
```

## Testing

You can run unit tests with:

```bash
$ npm run test
```
