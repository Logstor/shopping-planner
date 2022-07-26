import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { RecipeService } from "../recipe.service";
import { Recipe } from "./recipe.model";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>
{
    constructor(private readonly dataStorage: DataStorageService, private readonly recipesService: RecipeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> 
    {
        const recipes = this.recipesService.recipeList;

        if (recipes.length === 0)
            return this.dataStorage.fetchRecipes();
        else
            return recipes;
    }
}