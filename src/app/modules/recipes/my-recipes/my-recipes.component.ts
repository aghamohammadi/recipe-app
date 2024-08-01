import { Component, ViewEncapsulation } from '@angular/core';
import { StoreRecipeService } from '@app/core/services/store-recipe.service';
import { Recipe } from '@app/shared/models/recipe.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MyRecipesComponent {
  private unsubscribe$ = new Subject();

  savedRecipes: Recipe[] = [];
  constructor(private storeRecipeService: StoreRecipeService) {
  }
  ngOnInit() {
       this.storeRecipeService.savedRecipes$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (items: Recipe[]) => {
          this.savedRecipes = items;
        }
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
  }
}
