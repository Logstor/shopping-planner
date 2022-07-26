import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy
{
  navbarCollapsed: boolean = true;
  isAuthenticated: boolean = false;
  private isFetching: boolean = false;
  private userSub: Subscription;

  constructor(
    private readonly router: Router, 
    private readonly dataStorage: DataStorageService,
    private readonly auth: AuthService
  ) { }

  ngOnInit(): void 
  {
    this.userSub = this.auth.user.subscribe(user => {
      this.isAuthenticated = !!user; // First check whether there's no user and second inverts that so if it isn't null it's true
    });
  }

  ngOnDestroy(): void 
  {
    this.userSub.unsubscribe();    
  }

  onSaveData(): void
  {
    this.dataStorage.storeRecipes();
  }

  onFetchData(): void
  {
    if (this.isFetching) return;

    this.isFetching = true;
    this.dataStorage.fetchRecipes().subscribe(
      () => {}, error => {}, () => this.isFetching = false
    );
  }

  onLogout(): void
  {
    this.auth.logout();
  }
}
