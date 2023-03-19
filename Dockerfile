# from base image node
FROM node:8.11-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy oter files as well
COPY dist/app.js .

#expose the port
EXPOSE 80

# command to run when intantiate an image
CMD ["node","app.js"]