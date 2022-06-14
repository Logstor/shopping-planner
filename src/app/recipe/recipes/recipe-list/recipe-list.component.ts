import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../Recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit
{
  @Output()
  readonly clickedRecipeItem: EventEmitter<Recipe> = new EventEmitter();

  readonly recipes: Recipe[] = [
    new Recipe(
      "Dahl", 
      "Linser og alt andet bliver bare smadret sammen på samme tid.", 
      "data:image/jpeg;base64,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")
  ];

  constructor() { }

  ngOnInit(): void { }
}
