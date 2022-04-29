import { Ingredient } from 'src/app/shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {
  listChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Potatos', 4),
    new Ingredient('Tomatos', 2),
    new Ingredient('Onions', 3),
  ];

  getShoppingList() {
    return this.ingredients;
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  addAllIngredients(newIngredients: Ingredient[]) {
    this.ingredients.push(...newIngredients);
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }
}
