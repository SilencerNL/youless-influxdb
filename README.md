Publish Youless metrics to InfluxDB
=======================================

Every 5 seconds send the Youless metrics to InfluxDB. This version only works with the Enelogic firmware.


[![Docker Pulls](https://img.shields.io/docker/pulls/trafex/youless-influxdb.svg)](https://hub.docker.com/r/trafex/youless-influxdb/)

Usage
-----

    docker run -d --name youless -e "YOULESS_URI=http://<Youless IP>" -e "INFLUXDB_URI=http://<InfluxDB uri>:8086/write?db=youless" trafex/youless-influxdb

Debugging
---------
Add to the run command:

    -v "$PWD":/usr/src/app -w /usr/src/app
