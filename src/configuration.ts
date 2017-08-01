class Configuration {
  shell: any;
  requiredJavaVersion: string = '1.8';

  constructor(shell) {
    this.shell = shell
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