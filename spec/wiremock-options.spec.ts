import { WiremockOptions } from '../src/wiremock-options';

let expect = require('chai').expect;
let sinon = require('sinon');

let yargs = { port: 8090, rootDir: './samples/' };
let wiremockOptions: WiremockOptions;

describe('Configuration', () => {
  beforeEach(() => {
  });

});