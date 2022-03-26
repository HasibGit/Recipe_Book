import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeItem = this.recipeService.getRecipe(+params['id']);
    });
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addAllIngredients(ingredients);
  }

  editRecipe() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    this.router.navigate(['recipes/' + this.id + '/edit']);
  }
}
