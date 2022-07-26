import { NgModule } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeEmptyComponent } from "./recipes/recipe-empty/recipe-empty.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes/recipes.component";

@NgModule({
    declarations: [
        RecipeItemComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipesComponent,
        RecipeEditComponent,
        RecipeEmptyComponent
    ],
    imports: [
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule,
    ],
    exports: []
})
export class RecipesModule {}