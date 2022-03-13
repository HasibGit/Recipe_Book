import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css', '../../../../styles.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipeItem: Recipe;

  @Output() displayRecipe = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(recipe: Recipe) {
    this.displayRecipe.emit(recipe);
  }

}
