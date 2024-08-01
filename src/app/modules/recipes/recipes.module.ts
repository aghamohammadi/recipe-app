import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipesComponent } from './recipes.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { SharedModule } from '@app/shared/shared.module';
import { RecipesPaginationComponent } from './recipes-pagination/recipes-pagination.component';


@NgModule({
  declarations: [
    RecipeCardComponent,
    RecipesComponent,
    MyRecipesComponent,
    RecipesPaginationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule { }
