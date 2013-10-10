/* global module */
'use strict';

function Output (config) {
    this.result = config.result;
}

Output.prototype.initialize = function (done) {
    var err;

    if (typeof this.result !== 'object') {
        err = new Error(
            'Output should be given a reference to an Object literal'
        );
    }

    done(err);
};

Output.prototype.execute = function (output, done) {
    for (var key in output) {
        this.result[key] = output[key];
    }

    done();
};

module.exports = function (config) {
    return new Output(config || {});
};