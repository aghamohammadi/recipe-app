import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { RecipesComponent } from './recipes.component';
import { RecipesPaginationComponent } from './recipes-pagination/recipes-pagination.component';

const routes: Routes = [
  {
    path: '', component: RecipesComponent
  },
  {
    path: 'recipes-pagination', component: RecipesPaginationComponent
  },
  {
    path: 'my-recipes', component: MyRecipesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
