import { Ingredient } from "src/app/shared/ingredient.model";
import { EventEmitter } from "@angular/core";

export class ShoppingListService {

    listChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Potatos', 4),
        new Ingredient('Tomatos', 2),
        new Ingredient('Onions', 3)
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

}