import { EventEmitter, Injectable, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeService {
  @Output() selectedRecipe = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Beef Bhuna',
      'huahduiw qwdioqw qjwdjwq9dj vlpqp[wqeopqwk wqoopj qiwjhiqw adp[aoswqp wqoiopwq ovopj[owjdopwjdopwqjdwqopjdwqm ojkfdowpq ojcaospj pocjkwOPJ ojkqwopj',
      'https://cookbook.pfeiffer.net.au/files/beefBhuna.jpg',
      [
        new Ingredient('Beef', 2),
        new Ingredient('Onion', 5),
        new Ingredient('Spices', 2),
      ]
    ),
    new Recipe(
      'Kacchi Biryani',
      'asdjwiqj wqhdiowqhd iopqwdiowqjdiopwqj wqjdiopwqjdopwq opwqdopwqj p9wqjdwqjd wqiwqj',
      'https://vismaifood.com/storage/app/uploads/public/e12/7b7/127/thumb__1200_0_0_0_auto.jpg',
      [
        new Ingredient('Mutton', 2),
        new Ingredient('Polao', 2),
        new Ingredient('Yogurt', 1),
      ]
    ),
  ];

  getRecipes() {
    return this.recipes.slice(0, this.recipes.length);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  displaySelectedRecipe(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }
}