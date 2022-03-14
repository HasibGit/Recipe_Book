import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {


  ingredients: Ingredient[] = [
    new Ingredient('Potatos', 4),
    new Ingredient('Tomatos', 2),
    new Ingredient('Onions', 3)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
  }

}
