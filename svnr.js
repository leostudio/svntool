#!/usr/bin/env node

var _ = require('lodash');
var shell = require('shelljs');
var xmlParse = require('xml2js').parseString;

var argv = require('yargs')
    .option('s', {
        alias: 'search',
        demand: true,
        describe: 'msg search keyword',
        type: 'string'
    })
    .option('l', {
        demand: true,
        describe: 'num of log to parse',
        default: '20',
        type: 'int'
    })
    .option('p', {
        alias: 'path',
        demand: true,
        default: '.',
        type: 'string'
    }).argv;

var svnPath = argv.p;
var keyWord = argv.s;
var logNum = argv.l;

var command = 'svn log -l ' + logNum + ' -v --xml --search ' + keyWord + ' ' + svnPath;
shell.exec(command, {
    silent: true
}, function(code, output) {
    if (code !== 0) {
        console.error('error:',error);
        return;
    }
    xmlParse(output, function(err, result) {
        if(err){
            console.error('error:',err);
            return;
        }
        var logentrys = result.log.logentry;
        _.forEach(logentrys, function(logentry) {
            var revision = logentry.$.revision;
            if (revision) {
                console.log(revision);
            }
        });
    });
});
