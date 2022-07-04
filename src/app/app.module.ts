import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { RecipeItemComponent } from './recipe/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe/recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe/recipes/recipe-detail/recipe-detail.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { RecipesComponent } from './recipe/recipes/recipes.component';
import { ShoppingEditComponent } from './shopping/shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    HeaderComponent,
    RecipesComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
