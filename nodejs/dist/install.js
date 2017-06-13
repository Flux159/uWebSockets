
var exec = require('child_process').exec;
var path = require('path');
var packageJson = require('./package.json');

var command_line = 'node-gyp rebuild > build_log.txt 2>&1 || exit 0';
// Without stderr redirection / always passing:
// var command_line = 'node-gyp rebuild > build_log.txt';

// TODO: Later could make this from package.json 'binary' so it matches node-pre-gyp
var githubUsername = 'Flux159';
var githubProjectName = 'uWebSockets';
var version = 'v' + packageJson.version;
var platform = process.platform;
var nodeVersion = process.versions.modules;

var fileName = 'uws_' + platform +'_' + nodeVersion + '.node';
var urlLink = 'https://github.com/' + githubUsername + '/' +
    githubProjectName + '/releases/download/' + version + '/' + fileName;
var windowsPath = path.resolve(__dirname, './' + fileName);

// TODO: No idea if this handles proxies, redirects properly
var curlCommand = 'curl -fLO ' + urlLink;
// Note that powershell 3.0 allows you to use wget, but this command can work on
// Powershell 2.0 (.NET 2.0)
var powershellCommand = '(new-object System.Net.WebClient).DownloadFile( "'+
    urlLink + '", "' + windowsPath + '")';

var command = exec(command_line, function (error, stdout, stderr) {
    // Errors won't happen because 2>&1 and || exit 0 will almost always succeed
    if (error) {}

    // Download binary if command failed (using curl or powershell download file)
    // Note that currently this always downloads
    if (process.platform === 'win32') {
        exec(powershellCommand, function(error, stdout, stderr) {
            // Ignore errors for now, if download fails, then runtime (see uws.js) will fail
            // Proper way of handling this would be to throw error to stderr
        });
    } else {
        exec(curlCommand, function (error, stdout, stderr) {
            // Ignore errors for now, if download fails, then runtime (see uws.js) will fail
            // Proper way of handling this would be to throw error to stderr
        });
    }
});
