import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StoreRecipeService } from '@app/core/services/store-recipe.service';
import { Recipe } from '@app/shared/models/recipe.model';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class NavComponent {
  private unsubscribe$ = new Subject();
  private routerEventsSubscription!: Subscription;

  public isMobile: boolean = false;
  public isMenuOpen: boolean = false;
  savedRecipeCount = 0;

  constructor(
    private storeRecipeService: StoreRecipeService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 992;

    this.savedRecipeCount = this.storeRecipeService.getTotal();

    this.storeRecipeService.savedRecipes$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (items: Recipe[]) => {
          this.savedRecipeCount = items.length;
        }
      );

      this.routerEventsSubscription = this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.isMenuOpen = false;
        }
      });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnDestroy() {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
    this.routerEventsSubscription.unsubscribe();
  }
}
