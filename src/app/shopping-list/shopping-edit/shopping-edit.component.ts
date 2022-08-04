import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') addIngredientForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  newIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromShoppingList.AppState>) {} 

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.addIngredientForm.setValue({
          ingredientName: this.editedItem.name,
          ingredientAmount: this.editedItem.amount,
        });
      }
    );
  }

  onAddIngredient() {
    this.newIngredient = new Ingredient(
      this.addIngredientForm.form.value.ingredientName,
      this.addIngredientForm.form.value.ingredientAmount
    );

    if (this.editMode) {
      // this.shoppingListService.updateIngredient(
      //   this.editedItemIndex,
      //   this.newIngredient
      // );
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editedItemIndex, ingredient: this.newIngredient}));
      this.editMode = false;
    } else {
      // this.shoppingListService.addIngredient(this.newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(this.newIngredient));
    }

    this.addIngredientForm.resetForm();
  }

  clearForm() {
    this.addIngredientForm.resetForm();
    this.editMode = false;
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    this.clearForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
