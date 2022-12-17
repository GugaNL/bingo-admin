#Use node light version for linux
FROM node:14-alpine

#Create the folder where will be use for all processes bellow
WORKDIR /app

#Copy package.json and package-lock.json if exist to the workdir created previously
COPY package*.json ./

RUN npm i

#Copy the rest of project folders to the workdir created previously to the docker container
COPY . .

#Use port 3000
EXPOSE 3000

#Execute commands for initialize the project
CMD ["npm", "start"]