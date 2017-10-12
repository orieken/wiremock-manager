export class WiremockOptions {
  public port: number = 8080;
  public 'root-dir': string = './wiremock';

  constructor(fields?: Partial<WiremockOptions>){
    if(fields) {
      Object.assign(this, fields)
    }
  }
}