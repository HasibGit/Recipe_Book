import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
@Injectable()
export class RecipeDetailComponent implements OnInit {
  recipeItem: Recipe;
  id: number;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private store: Store<fromShoppingList.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });

    this.route.params.subscribe((params: Params) => {
      this.recipeItem = this.recipeService.getRecipe(+params['id']);
    });
  }

  addToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addAllIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  editRecipe() {
    this.router.navigate(['recipes/' + this.id + '/edit']);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }
}
