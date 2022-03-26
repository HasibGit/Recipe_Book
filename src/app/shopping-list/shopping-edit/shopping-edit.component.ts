import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output() addedIngredient = new EventEmitter<Ingredient>();

  @ViewChild('ingredientNameField', { static: true }) ingredientName: ElementRef;
  @ViewChild('ingredientAmountField', { static: true }) ingredientAmount: ElementRef;

  newIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addIngredient() {
    this.newIngredient = new Ingredient(this.ingredientName.nativeElement.value, this.ingredientAmount.nativeElement.value);
    this.shoppingListService.addIngredient(this.newIngredient);
  }

}
