# www-project
Web application for monitoring patients with covid 19 in Colombia


### REST API DOCKER DEPLOY
Corona Tracking REST API is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 4000, so you can change this if necessary.

```sh
cd server
docker build -t www-server .
```
This will create the Corona Tracking REST API image and pull in the necessary dependencies.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 4000 of the host to port 4000 of the Docker

```sh
docker run -it -p 4000:4000 www-server
```

### Run as a process if necessary.

```sh
docker run -d -p 4000:4000 www-server
```
This will give you an ID process, if you want to terminate the process, run:

```sh
docker ps
docker stop "your processId"
```
`docker ps` will give you the process id of your Image.


Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:4000
```
