## Instructions

* ```docker-compose build``` for build dockerfile
* ```docker-compose up -d``` for run docker services

## Utils commands
* Stop and remove all containers ```docker-compose down```
* Remove all containers by force ```docker rm  -f $(docker ps -a -q)```
* Remove all images ```docker image prune -a```
* build and up container ```docker-compose up --build```