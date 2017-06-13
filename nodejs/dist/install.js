
var exec = require('child_process').exec;

// Run in cmd or in bash
// https://stackoverflow.com/questions/32971416/cross-platform-npm-start-script
// node-gyp rebuild > build_log.txt 2>&1 || exit 0
var command_line = 'node-gyp rebuild > build_log.txt 2>&1 || exit 0';
// var environ = (!process.argv[2].indexOf('development')) ? 'development' : 'production';

// if(process.platform === 'win32') {
//   // tricks : https://github.com/remy/nodemon/issues/184#issuecomment-87378478 (Just don't add the space after the NODE_ENV variable, just straight to &&:)      
//   command_line = 'set NODE_ENV=' + environ + '&& ' + command_line;
// } else {
//   command_line = 'NODE_ENV=' + environ + ' ' + command_line;
// }

var command = exec(command_line);

command.stdout.on('data', function(data) {
  process.stdout.write(data);
});
command.stderr.on('data', function(data) {
  process.stderr.write(data);
});
command.on('error', function(err) {
  process.stderr.write(err);
});

// Need to handle cross platform download of binary if node-gyp fails
// Technically would want to use node-pre-gyp or request module since those are
// more thoroughly tested (and deal w/ proxies, etc.). See node-sass install script

// Alternatively could just exec curl and throw an error to stdout if curl doesn't 
// exist - same as node-gyp rebuild then
