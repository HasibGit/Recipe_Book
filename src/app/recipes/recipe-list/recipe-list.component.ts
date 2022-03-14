import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css', '../../../styles.css']
})
export class RecipeListComponent implements OnInit {


  @Output() propagator = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Biryani', 'Some sample description bla bla', 'https://vismaifood.com/storage/app/uploads/public/e12/7b7/127/thumb__1200_0_0_0_auto.jpg'),
    new Recipe('Kacchi Biryani', 'Some sample description bla bla', 'https://vismaifood.com/storage/app/uploads/public/e12/7b7/127/thumb__1200_0_0_0_auto.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  propagateRecipe(recipe: Recipe) {
    this.propagator.emit(recipe);
  }

}
