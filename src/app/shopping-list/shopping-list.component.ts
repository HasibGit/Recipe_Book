import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [],
})
export class ShoppingListComponent implements OnInit {
  shoppingList: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingList = this.shoppingListService.getShoppingList();
  }

  onEditItem(index) {
    this.shoppingListService.startedEditing.next(index);
  }
}
