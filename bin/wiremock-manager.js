#!/usr/bin/env node
require('ts-node/register');

const Configuration = require('../src/configuration');
const chalk = require('chalk');
const log = console.log;
let shell = require('shelljs');
let config = new Configuration(shell);
let installedJavaVersion;

if (config.isJavaInstalled()) {
  log(chalk.blue('Java is installed checking version.'));
  installedJavaVersion = config.getJavaVersion();
}

if (config.requiredJavaVersion >= installedJavaVersion) {
  log(chalk.red(`WireMock requires java version ${config.requiredJavaVersion} or higher`))
}