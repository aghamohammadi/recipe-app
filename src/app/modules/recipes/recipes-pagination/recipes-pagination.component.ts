import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/core/services/alert.service';
import { RecipeService } from '@app/core/services/recipe.service';
import { Recipe } from '@app/shared/models/recipe.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-recipes-pagination',
  templateUrl: './recipes-pagination.component.html',
  styleUrl: './recipes-pagination.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RecipesPaginationComponent {
  public recipes: Recipe[] = [];
  public filteredRecipes: Recipe[] = [];
  public isLoading: boolean = false;
  public hasError: boolean = false;
  public pageNumber: number = 1;
  public pageSize: number = 8;
  public totalCount = 0;
  private unsubscribe$ = new Subject();

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}


  ngOnInit() {
    this.isLoading = true;
    this.hasError = false;

    

    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {

        if (params['page'])
          this.pageNumber = +params['page'];

        this.loadRecipes();
      });

    
  }

  private setQueryParams(query: any) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: query,
        queryParamsHandling: 'merge'
      });
  }

  onChangePage(page: number) {
    this.pageNumber = page;
    this.setQueryParams({ page: page });
  }

  getPagination(){
    const startIndex = (this.pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return {startIndex,endIndex}
  }

  loadRecipes(): void {
    this.isLoading = true;
    this.hasError = false;
    const {startIndex,endIndex}=this.getPagination();

    this.recipeService.getRecipes().subscribe(
      recipes => {
        this.recipes = recipes;
        this.filteredRecipes = recipes.slice(startIndex, endIndex);;
        this.totalCount = recipes.length;
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
    if(this.pageNumber!=1){
      this.pageNumber=1;

    }

    const {startIndex,endIndex}=this.getPagination();
    const result= this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchText.toLowerCase()) &&
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchText.toLowerCase()))
    );
    this.filteredRecipes =result.slice(startIndex, endIndex);
    this.totalCount =result.length;
  }


  ngOnDestroy() {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
  }

}
