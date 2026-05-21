const fs = require('fs');

function readConfig(configName) {
  const configPath = __dirname + '/configs/' + configName + '.json';
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

function getOutputPath(filename) {
  return __dirname + '/output/' + filename;
}

function readTextFile(filepath) {
  return fs.readFileSync(filepath, 'utf8');
}

module.exports = { readConfig, getOutputPath, readTextFile };
