## Tasklist service

#### TO DO
Project description

### Requirements

You need installed the next packages:

- `node v10.16`
- `npm 6.10.3`
- `docker`
- `docker-compose`

### Setup with docker

1. Needs clone this repository
2. Builds the images with `docker-compose build`
3. Put up running environment with `docker-compose up`
4. Ensure that project is running with `docker-compose ps`
5. Turning off the local environment `docker-compose down`
6. Turning off and remove containers (optional) `docker-compose down -v`

### Straightforward path

In your local machine run:

`npm install`

That's it all for the setup 🤓

### Debugging with Docker

You can see the `tasklist` (api) service logs with the next command

`docker-compose logs --tail 100 -f api`

For mongo logs: `docker-compose logs --tail 100 -f mongodb`

Accessing to api shell

`docker-compose exec api sh`

### Usage

You can use the postman collection for see available endpoints.

[POSTMAN COLLECTION](https://www.getpostman.com/collections/e4c0052f6bb07683537f)
