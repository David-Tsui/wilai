FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install
RUN npm install -g forever
ADD . /usr/src/app

CMD ["forever", "./bin/www"]