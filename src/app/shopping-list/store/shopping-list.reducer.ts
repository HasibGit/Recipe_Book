import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Potatos', 4),
    new Ingredient('Tomatos', 2),
    new Ingredient('Onions', 3),
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions){
  switch(action.type){
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]   // since the payload here is an array 
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient; 
      return {
        ...state,
        ingredients: updatedIngredients
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, ingredientIndex)=>{
          return ingredientIndex !== action.payload;
        })
      }
    default: 
      return state;
  }
}