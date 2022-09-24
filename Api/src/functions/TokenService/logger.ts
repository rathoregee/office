export default class Logger {
    public info(messageTemplate: string, ...properties: any[]): void {}
  
    public debug(messageTemplate: string, ...properties: any[]): void {}
  
    public error(
      error: Error,
      messageTemplate: string,
      ...properties: any[]
    ): void {}
  }
  