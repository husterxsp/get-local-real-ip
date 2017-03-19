'use strict';

var os = require('os');
var ifaces = os.networkInterfaces();

function getIP() {
    var address = '127.0.0.1';
    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            // there may be more than one address, such as if I open a Wifi with my mac,
            // the address may have 169.254.*.* and 192.168.*.*
            // and 169.254.*.* can't be connected
            // just use the last one after the forEach 
            address =  iface.address;
        });
    });
    return address;
}

module.exports = getIP;