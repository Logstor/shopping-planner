import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../auth/auth.guard.service";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeEmptyComponent } from "./recipes/recipe-empty/recipe-empty.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { RecipesComponent } from "./recipes/recipes.component";

const routes: Routes = [
    { 
        path: 'recipes', 
        component: RecipesComponent,
        canActivate: [ AuthGuardService ],
        children: [
            { path: '', component: RecipeEmptyComponent, pathMatch: 'full' },
            { path: 'new', component: RecipeEditComponent, pathMatch: 'full' },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
        ]
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class RecipesRoutingModule {}