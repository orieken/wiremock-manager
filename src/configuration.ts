import { WiremockOptions } from './wiremock-options';

class Configuration {
  shell: any;
  requiredJavaVersion: string = '1.8';
  wiremockVersion: string = '2.8.0';
  wiremockOptions: WiremockOptions;
  options: string[];
  wiremockKeyOptions =[
    'port',
    'root-dir'
  ];

  constructor(shell, yargs) {
    this.shell = shell;
    this.wiremockOptions = this.createWiremockOptions(yargs);
    this.options = Object.keys(this.wiremockOptions).map((key) => `--${key} ${this.wiremockOptions[key]}`)
  }

  createWiremockOptions(yargs) {
    if (this.arrayContainsArray(Object.keys(yargs), this.wiremockKeyOptions)) {
      return new WiremockOptions(yargs);
    }
    return new WiremockOptions();
  }


  arrayContainsArray(superset, subset) {
    return superset.some((value) => {
      return (subset.indexOf(value) >= 0);
    });
  }

  isJavaInstalled() {
    if (!this.shell.which('java')) {
      throw 'Sorry, this script requires java';
    }
    return true
  }

  getJavaVersion() {
    let javaVersion = this.shell.exec('java -version', {silent: true}).stderr;
    return javaVersion.match(/\d.\d.\d_\d{2}/gm)[0]
  }
}

export = Configuration