import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { RecipeService } from 'src/app/recipe/recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit 
{
  @Input()
  recipe: Recipe;
  @Input()
  index: number;

  constructor(
    private router: Router, 
    private currRoute: ActivatedRoute
  ) { }

  ngOnInit(): void { }
}
