import Configuration = require('../src/configuration');

let expect = require('chai').expect;
let sinon = require('sinon');
let shell = require('shelljs');
let yargs = { port: 8090, rootDir: './samples/' };
let configuration: Configuration;

describe('Configuration', () => {
  beforeEach(() => {
    configuration = new Configuration(shell, yargs);
  });

  describe('isJavaInstalled()', () => {
    it('returns true if java is installed', () => {
      expect(configuration.isJavaInstalled()).to.be.true;
    });

    it('throws message if java is not installed', () => {
      let stubbedWhich = sinon.stub().returns(false);
      let stubbedShell = {which: stubbedWhich};
      let config = new Configuration(stubbedShell, yargs);
      expect(() => {
        config.isJavaInstalled()
      }).to.throw('Sorry, this script requires java');
    });
  });

  describe('getJavaVersion()', () => {
    let versionString = 'java version "1.6.0_65"\\n' +
        'Java(TM) SE Runtime Environment (build 1.6.0_65-b14-468-11M4833)\\n' +
        'Java HotSpot(TM) 64-Bit Server VM (build 20.65-b04-468, mixed mode)\\n';
    it('returns java version', () => {
      let stubbedWhich = sinon.stub().returns({stderr: versionString});
      let stubbedShell = {exec: stubbedWhich};
      let config = new Configuration(stubbedShell, yargs);
      expect(config.getJavaVersion()).to.include('1.6.0_65')
    });
  });
});
