import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ShoppingListService } from './shopping/shopping-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShoppingListService]
})
export class AppComponent implements OnInit
{
  constructor(private readonly auth: AuthService) {}

  ngOnInit(): void 
  {
    this.auth.autoLogin();
  }
}
