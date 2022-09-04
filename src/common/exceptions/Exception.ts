export class Exception extends Error {
  private statusCode: number;
  private _path: string;

  constructor(msg: string, statusCode: number) {
    super(msg);
    this.statusCode = statusCode;
  }

  public set path(path: string) {
    this._path = path;
  }
}
