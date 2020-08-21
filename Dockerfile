FROM node:12.4-alpine

LABEL Maintainer="Roy Sonnega" \
      Description="Sending detailed Youless metrics to InfluxDB"

# Create workdir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Add application
COPY package.json yarn.lock /usr/src/app/
RUN yarn install --non-interactive && yarn cache clean
COPY . /usr/src/app

CMD [ "yarn", "start" ]
