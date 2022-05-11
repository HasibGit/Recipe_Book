import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeService {
  @Output() selectedRecipe = new EventEmitter<Recipe>();

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice(0, this.recipes.length);
  }

  removeIngredient(recipeIndex: number, ingredientIndex: number) {
    this.recipes[recipeIndex].ingredients.splice(ingredientIndex, 1);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  displaySelectedRecipe(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }

  updateRecipe(updatedRecipe: Recipe, index: number) {
    this.recipes[index] = updatedRecipe;
    this.recipesChanged.next(this.recipes);
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes);
  }
}
