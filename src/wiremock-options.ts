export class WiremockOptions {
  public port: number = 8080;
  public 'root-dir': string = './responses';

  constructor(fields?: {
    port?: number;
    'root-dir'?: string;
  }){
    if(fields) {
      Object.assign(this, fields)
    }
  }
}