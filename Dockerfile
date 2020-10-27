FROM node:14.13.1-alpine3.12

WORKDIR /var/www/html
COPY . /var/www/html

RUN npm install -g knex

CMD ["npm", "start"]