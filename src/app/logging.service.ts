import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService 
{
  private lastLog: string;

  printLog(msg: string): void
  {
    console.log(`New Log: ${msg}`);
    console.log(`Last Log: ${this.lastLog}`);
    this.lastLog = msg;
  }
}
