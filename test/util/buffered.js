'use strict';

var spawn = require('../../');

function buffered(command, args, options, callback) {
    var cp;
    var stdout = null;
    var stderr = null;

    if (typeof options === 'function') {
        callback = options;
        options = null;
    }

    if (typeof args === 'function') {
        callback = args;
        args = options = null;
    }

    cp = spawn(command, args, options);

    cp.stdout && cp.stdout.on('data', function (buffer) {
        stdout = stdout || '';
        stdout += buffer.toString();
    });

    cp.stderr && cp.stderr.on('data', function (buffer) {
        stderr = stderr || '';
        stderr += buffer.toString();
    });

    cp.on('error', callback);

    cp.on('close', function (code) {
        code !== 0 && stderr && console.warn(stderr);
        callback(null, stdout, code);
    });
}

module.exports = buffered;
