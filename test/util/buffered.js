'use strict';

var spawn = require('../../index');

function buffered(command, args, options, callback) {
    var cp;
    var data;

    if (typeof options === 'function') {
        callback = options;
        options = null;
    }

    if (typeof args === 'function') {
        callback = args;
        args = options = null;
    }

    cp = spawn(command, args, options);
    data = '';

    cp.stdout.on('data', function(buffer) {
        data += buffer.toString();
    });

    cp.on('error', callback);

    cp.on('close', function(code) {
        callback(null, data, code);
    });
}

module.exports = buffered;
