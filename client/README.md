### CLIENT DOCKER DEVELOPMENT ENVIRONMENT
Follow this tutorial for Docker instalation..
```sh
https://www.youtube.com/watch?v=BK-C2RofmTE
```
Once done, run de Docker image..
### Launch the container with Docker-compose

Once installed, run the Docker image, you will need to execute this command: 

```sh
cd client
docker-compose up
```
You will see how it creates the container according to Dockerfile and runs it with the definition of docker-compose.yml

### Run as a process if necessary.
You can run `docker-compose up` with the `-d` flag to run it in the background, in that case to stop it you must run the command `docker-compose down`

```sh
docker-compose -d up
docker-compose down
```

Verify the development environment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:3000
```
