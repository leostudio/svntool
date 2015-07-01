#!/usr/bin/env node

var _ = require('lodash');
var shell = require('shelljs');
var xmlParse = require('xml2js').parseString;
var path = require('path');
var util = require('util');
var argv = require('yargs')
    .option('f',{
        alias:"prefix",
        demand:true,
        describe:'path prefix to remove',
        default:'/手机医生站/src/trunk/',
        type:'string'
    })
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
var prefix=argv.f;


var command='svn log -l ' + logNum + ' -v --xml --search '+keyWord+' '+svnPath;
shell.exec(command, {
    silent: true
}, function(code, output) {
    if(code!==0){
        return;
    }
    var logData = xmlParse(output, function(err, result) {
        var logentrys = result.log.logentry;
        _.forEach(logentrys, function(logentry) {
            var revision=logentry.$.revision;
            if(revision){
                console.log(revision);
            }
        });
    });
});
