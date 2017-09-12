#!/usr/bin/env node
require('ts-node/register');

const Configuration = require('../src/configuration');
const chalk = require('chalk');
const log = console.log;
let shell = require('shelljs');
let installedJavaVersion;
let yargs = require('yargs').argv;
let config = new Configuration(shell, yargs);

let options = {
  port: yargs.port,
  rootDir: yargs['root-dir']
};

if (config.isJavaInstalled()) {
  log(chalk.blue('Java is installed checking version.'));
  installedJavaVersion = config.getJavaVersion();
}

if (config.requiredJavaVersion >= installedJavaVersion) {
  log(chalk.red(`WireMock requires java version ${config.requiredJavaVersion} or higher`))
}
log(options);
log(config.options);

shell.exec(`java -jar wiremock-standalone-${config.wiremockVersion}.jar ${config.options.join(' ')}`);