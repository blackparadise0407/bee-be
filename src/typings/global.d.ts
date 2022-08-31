declare global {
  interface ZingMp3Response {
    data: {
      128: string;
      320: string;
    };
    err: number;
    msg: string;
    timestamp: number;
  }
}
export {};
