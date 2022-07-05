import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "./recipe/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe/recipes/recipe-edit/recipe-edit.component";
import { RecipeEmptyComponent } from "./recipe/recipes/recipe-empty/recipe-empty.component";
import { RecipesComponent } from "./recipe/recipes/recipes.component";
import { ShoppingListComponent } from "./shopping/shopping-list/shopping-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { 
        path: 'recipes', 
        component: RecipesComponent,
        children: [
            { path: '', component: RecipeEmptyComponent, pathMatch: 'full' },
            { path: 'new', component: RecipeEditComponent, pathMatch: 'full' },
            { path: ':id', component: RecipeDetailComponent },
            { path: ':id/edit', component: RecipeEditComponent }
        ]
    },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: '**', redirectTo: '/recipes' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }