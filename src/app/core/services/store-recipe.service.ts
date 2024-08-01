import { Injectable } from '@angular/core';
import { Recipe } from '@app/shared/models/recipe.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreRecipeService {

  private savedRecipes: Recipe[] = [];
  private savedRecipesSubject = new BehaviorSubject<Recipe[]>([]);

  savedRecipes$ = this.savedRecipesSubject.asObservable();

  constructor() {
    this.loadSavedRecipes();
  }

  private loadSavedRecipes() {
    const saved = localStorage.getItem('savedRecipes');
    if (saved) {
      this.savedRecipes = JSON.parse(saved);
      this.savedRecipesSubject.next(this.savedRecipes);
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('savedRecipes', JSON.stringify(this.savedRecipes));
    this.savedRecipesSubject.next(this.savedRecipes);
  }

  getSavedRecipes(): Recipe[] {
    return this.savedRecipes;
  }

  getTotal(): number {
    return this.savedRecipes.length;
  }

  saveRecipe(recipe: Recipe): void {
    if (!this.savedRecipes.find(r => r.id === recipe.id)) {
      this.savedRecipes.push(recipe);
      this.saveToLocalStorage();
    }
  }

  removeRecipe(recipe: Recipe): void {
    this.savedRecipes = this.savedRecipes.filter(r => r.id !== recipe.id);
    this.saveToLocalStorage();
  }
}
