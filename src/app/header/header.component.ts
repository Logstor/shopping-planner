import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
{
  navbarCollapsed: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  /**
   * 
   */
  navigateRecipe(): void 
  {
    this.router.navigate(['recipes'])
  }

  /**
   * 
   */
  navigateShoppingList(): void
  {
    this.router.navigate(['shopping-list'])
  }

}
