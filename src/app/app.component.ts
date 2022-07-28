import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import { AutoLogin } from './auth/store/auth.actions';
import { AppState } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit
{
  constructor(
    private readonly auth: AuthService, 
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void 
  {
    this.store.dispatch(new AutoLogin());
  }
}
