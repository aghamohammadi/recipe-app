import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { AlertService } from '@app/core/services/alert.service';
import { StoreRecipeService } from '@app/core/services/store-recipe.service';
import { Recipe } from '@app/shared/models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;

  constructor(
    private storeRecipeService: StoreRecipeService,
    private alertService: AlertService
  ) {}


  saveRecipe() {
    this.storeRecipeService.saveRecipe(this.recipe);
    this.alertService.add("Successfully Added!")
  }

  removeRecipe() {
    this.storeRecipeService.removeRecipe(this.recipe);
    this.alertService.add("Successfully Removed!")

  }

  get isSaved(): boolean{
    return this.storeRecipeService.getSavedRecipes().some(r => r.id === this.recipe.id);
  }
}
