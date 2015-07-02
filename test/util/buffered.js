'use strict';

var spawn = require('../../');

function buffered(command, args, options, callback) {
    var cp;
    var data = null;

    if (typeof options === 'function') {
        callback = options;
        options = null;
    }

    if (typeof args === 'function') {
        callback = args;
        args = options = null;
    }

    cp = spawn(command, args, options);

    cp.stdout && cp.stdout.on('data', function(buffer) {
        data = data || '';
        data += buffer.toString();
    });

    cp.on('error', callback);

    cp.on('close', function(code) {
        callback(null, data, code);
    });
}

module.exports = buffered;
