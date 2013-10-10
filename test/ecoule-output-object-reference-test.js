/*jslint maxlen:140*/
/* global require process */
'use strict';

var buster = require('buster'),
    output = require('../lib/ecoule-output-object-reference'),

    assert = buster.referee.assert,
    refute = buster.referee.refute
;

function throwError (err) {
    if (err) {
        throw err;
    }
}

buster.testCase('Basic écoule output support', {
    'should implement an execute function': function () {
        assert.isFunction(output({}).execute);
    }
});

buster.testCase('During initialization', {
    'should throw an error if': {
        'no object literal was given was given': function () {
            assert.exception(function() {
                output({}).initialize(throwError);
            });
            refute.exception(function() {
                var test = {};
                output({ result: test }).initialize(throwError);
            });
        }
    }
});

buster.testCase('During execution', {
    'should copy data into an passed in object literal': function () {
        var test = {};
        var transformerOutput = {'foo': 'bar', 'bar': 'foo'};
        var instance = output({ result: test });

        instance.initialize(function(err) {
            refute.isObject(err);
            instance.execute(transformerOutput, function () {
                assert.equals(test, transformerOutput);
            });
        });
    }
});