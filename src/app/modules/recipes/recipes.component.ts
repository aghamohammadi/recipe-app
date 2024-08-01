import { Component, ViewEncapsulation } from '@angular/core';
import { AlertService } from '@app/core/services/alert.service';
import { RecipeService } from '@app/core/services/recipe.service';
import { Recipe } from '@app/shared/models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RecipesComponent {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  isLoading: boolean = false;
  hasError: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private alertService: AlertService
  ) {}


  ngOnInit() {
    this.isLoading = true;
    this.hasError = false;

    this.loadRecipes();
    
  }

  loadRecipes(): void {
    this.isLoading = true;
    this.hasError = false;
    this.recipeService.getRecipes().subscribe(
      recipes => {
        this.recipes = recipes;
        this.filteredRecipes = recipes;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.hasError = true;
        this.alertService.addError('Failed to load recipes. Please try again later.');
      }
    );
  }

  filterRecipes(searchText: string): void {
    this.filteredRecipes = this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchText.toLowerCase()) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchText.toLowerCase()))
    );
  }

  
  

}
