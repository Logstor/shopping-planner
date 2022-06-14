import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../Recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit 
{
  @Input()
  recipe: Recipe;
  @Output()
  readonly clickEvent: EventEmitter<Recipe> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

}
