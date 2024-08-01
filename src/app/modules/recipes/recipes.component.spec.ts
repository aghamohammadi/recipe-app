import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesComponent } from './recipes.component';
import { RecipeService } from '@app/core/services/recipe.service';
import { Recipe } from '@app/shared/models/recipe.model';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { HighlightDirective } from '@app/shared/directives/highlight.directive';
import { AlertService } from '@app/core/services/alert.service';
import { ToastrModule } from 'ngx-toastr';
import { SearchFormComponent } from '@app/shared/components/search-form/search-form.component';

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let componentSearchForm: SearchFormComponent;
  let fixture: ComponentFixture<RecipesComponent>;
  let fixtureSearchForm: ComponentFixture<SearchFormComponent>;
  let recipeService: jasmine.SpyObj<RecipeService>;
  const mockRecipes: Recipe[] = [
    {
      "id": 1,
      "name": "Classic Margherita Pizza",
      "ingredients": [
        "Pizza dough",
        "Tomato sauce",
        "Fresh mozzarella cheese",
        "Fresh basil leaves",
        "Olive oil",
        "Salt and pepper to taste"
      ],
      "instructions": [
        "Preheat the oven to 475°F (245°C).",
        "Roll out the pizza dough and spread tomato sauce evenly.",
        "Top with slices of fresh mozzarella and fresh basil leaves.",
        "Drizzle with olive oil and season with salt and pepper.",
        "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
        "Slice and serve hot."
      ],
      "image": 
        "https://cdn.dummyjson.com/recipe-images/1.webp"
    },
    {
      "id": 2,
      "name": "Vegetarian Stir-Fry",
      "ingredients": [
        "Tofu, cubed",
        "Broccoli florets",
        "Carrots, sliced",
        "Bell peppers, sliced",
        "Soy sauce",
        "Ginger, minced",
        "Garlic, minced",
        "Sesame oil",
        "Cooked rice for serving"
      ],
      "instructions": [
        "In a wok, heat sesame oil over medium-high heat.",
        "Add minced ginger and garlic, sauté until fragrant.",
        "Add cubed tofu and stir-fry until golden brown.",
        "Add broccoli, carrots, and bell peppers. Cook until vegetables are tender-crisp.",
        "Pour soy sauce over the stir-fry and toss to combine.",
        "Serve over cooked rice."
      ],
      "image": 
        "https://cdn.dummyjson.com/recipe-images/2.webp"
    }
  ];

  beforeEach(async () => {
    const recipeServiceSpy = jasmine.createSpyObj('RecipeService', ['getRecipes']);

    await TestBed.configureTestingModule({
      declarations: [RecipesComponent,SearchFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule,ToastrModule.forRoot()],
      providers: [{ provide: RecipeService, useValue: recipeServiceSpy },AlertService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;

    fixtureSearchForm = TestBed.createComponent(SearchFormComponent);
    componentSearchForm = fixtureSearchForm.componentInstance;
    recipeService = TestBed.inject(RecipeService) as jasmine.SpyObj<RecipeService>;

     fixtureSearchForm.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoading to true while loading recipes', () => {
    recipeService.getRecipes.and.returnValue(of(mockRecipes));
    component.loadRecipes();
    expect(component.isLoading).toBeFalse();
    expect(component.recipes.length).toBe(2);
    expect(component.filteredRecipes.length).toBe(2);
  });
  it('should set hasError to true if recipe loading fails', () => {
    recipeService.getRecipes.and.returnValue(throwError(() => new Error('Failed to load')));
    component.loadRecipes();
    expect(component.isLoading).toBeFalse();
    expect(component.hasError).toBeTrue();
  });

  it('should filter recipes by name and ingredient', () => {
    component.recipes = mockRecipes;

    componentSearchForm.searchForm.setValue({ searchText: 'Margherita' });
    component.filterRecipes('Margherita');
    expect(component.filteredRecipes.length).toBe(1);
    expect(component.filteredRecipes[0].name).toBe('Classic Margherita Pizza');

    componentSearchForm.searchForm.setValue({ searchText: 'Vegetarian' });
    component.filterRecipes('Vegetarian');
    expect(component.filteredRecipes.length).toBe(1);
    expect(component.filteredRecipes[0].name).toBe('Vegetarian Stir-Fry');
  });

});
