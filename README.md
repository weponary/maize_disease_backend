# Steps To Run This Project

## Clone

```sh
  git clone git@github.com:udira-re/funolympic_backend.git
```

## Run Locally

**Requirement**

- Node = v18.14.2
- NPM = v9.5.0
- PostgreSQL = v15

**Steps**

- Create postgres user named "admin" with password "admin"
- Create database named "funolympic"
- Create .env file in project folder and the copy following
  POSTGRES_PASSWORD=admin
  POSTGRES_USER=postgres
  POSTGRES_DB=funolympic
  POSTGRES_HOST=localhost
  MAIL_USER=roxanne.gerlach57@ethereal.email
  MAIL_PASSWORD=W98uq61ZHfj7GAbeuJ
- Open project file and run the following command :
  ```sh
  npm run dev
  ```

## Using Docker

**Requirement**

- Docker

**Steps**

- Create .env file in project folder and the copy following
  POSTGRES_PASSWORD=admin
  POSTGRES_USER=postgres
  POSTGRES_DB=funolympic
  POSTGRES_HOST=db
  MAIL_USER=roxanne.gerlach57@ethereal.email
  MAIL_PASSWORD=W98uq61ZHfj7GAbeuJ
- Open project file and run following commands:

```sh
docker-compose up --build
```

- once completd open next terminal without closing first one then write following commands:

```sh
docker ps
```

```sh
docker exec -it <Database_imageId> /bin/bash
```

```
psql --username=admin --password
```

- enter the passowrd as "admin" then write following command

```sh
CREATE DATABASE funolympic;
```

- exit both terminal
- Open new terminal on same project folder and run following command

```sh
docker-compose up
```
