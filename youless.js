'use strict';

const request = require('request');

const updateStats = () => {
    request.get({
        method: 'GET',
        timeout: 1000,
        //uri: process.env.YOULESS_URI + '/e'
        uri: 'http://192.168.1.55/e'
    }, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            console.error("Couldn't reach Youless: " + error);
            return;
        }

        response = JSON.parse(response.body.replace('[', '').replace(']', '').replace('*', '0'));

        body =
            'current_watt,source=youless value=' + response['pwr'] + '\n' +
            'consumption_low,source=youless value=' + response['p1'] + '\n' +
            'consumption_high,source=youless value=' + response['p2'] + '\n' +
            'consumption_total,source=youless value=' + (response['p1'] + response['p2']) + '\n' +
            'production_low,source=youless value=' + response['n1'] + '\n' +
            'production_high,source=youless value=' + response['n2'] + '\n' +
            'production_total,source=youless value=' + (response['n1'] + response['n2']) + '\n' +
            'total_kwh,source=youless value=' + response['net'] + '\n' +
            'total_gas,source=youless value=' + response['gas'];

        request({
            method: 'POST',
            uri: process.env.INFLUXDB_URI,
            timeout: 1000,
            body: body
        }, (error, response) => {
            if (error) {
                console.error('Request Error: ' + error);
                return;
            }
            console.log('Send status to InfluxDB, status: ' + response.statusCode);
        });

        setTimeout(updateStats, 5000);
    });
};
updateStats();