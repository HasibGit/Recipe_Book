import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './services/shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [],
})
export class ShoppingListComponent implements OnInit {
  shoppingList: Observable<{ingredients: Ingredient[]}>;
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromShoppingList.AppState>) {}

  ngOnInit(): void {
    this.shoppingList = this.store.select('shoppingList');
    // this.shoppingList = this.shoppingListService.getShoppingList();
  }

  onEditItem(index) {
    this.shoppingListService.startedEditing.next(index);
  }
}
