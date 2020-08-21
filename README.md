Publish Youless metrics to InfluxDB
=======================================

Every 5 seconds send the Youless metrics to InfluxDB. This version only works with the Enelogic firmware.


[![Docker Pulls](https://img.shields.io/docker/pulls/silencernl/youless-influxdb-importer.svg)](https://hub.docker.com/r/silencernl/youless-influxdb-importer/)

Usage
-----

    docker run -d --name youless -e "YOULESS_URI=http://<Youless IP>" -e "INFLUXDB_URI=http://<InfluxDB uri>:8086/write?db=youless" silencernl/youless-influxdb-importer

Debugging
---------
Add to the run command:

    -v "$PWD":/usr/src/app -w /usr/src/app
