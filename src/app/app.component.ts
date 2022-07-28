import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit
{
  constructor(private readonly auth: AuthService, private readonly log: LoggingService) {}

  ngOnInit(): void 
  {
    this.auth.autoLogin();

    this.log.printLog('Hello from AppComponent ngOnInit()')
  }
}
