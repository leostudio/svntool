#!/usr/bin/env node
var shell = require('shelljs');
var xmlParse = require('xml2js').parseString;
var argv = require('yargs')
    .option('p',{
        alias:'path',
        demand:true,
        describe:'path prefix to remove',
        default:'.',
        type:'string'
    }).argv;

var svnPath=argv.p;

var command='svn info --xml '+svnPath;
shell.exec(command, {
    silent: true
}, function(code, output) {
    if(code!==0){
        console.log('error:',output);
        return;
    }
    xmlParse(output,function(error,result){
        if(!error){
            var prefix=result.info.entry[0]['relative-url'][0];
            console.log(decodeURIComponent(prefix.slice(1)));
        }else{
            console.error('error:',error);
        }
    })
});
