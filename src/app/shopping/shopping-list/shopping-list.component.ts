import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit
{
  ingredients: Ingredient[] = [
    new Ingredient("Hvidløg", 100),
    new Ingredient("Ingefær", 50)
  ];

  constructor() { }

  ngOnInit(): void { }
}
