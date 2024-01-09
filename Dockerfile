FROM node:iron-alpine

RUN apk add --no-cache bash

RUN mkdir -p /app
WORKDIR /app

CMD ["/bin/bash"]
