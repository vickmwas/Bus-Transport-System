# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /usr/app

# add `/app/node_modules/.bin` to $PATH

# install app dependencies
COPY ./package*.json ./
COPY ./yarn*.lock ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

EXPOSE 3000


# start app
CMD ["npm", "start"]