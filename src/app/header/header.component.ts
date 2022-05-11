import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/services/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() displayContent = new EventEmitter<string>();

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {}

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  // buttonClicked(link) {
  //   if (link == 'recipe') {
  //     this.displayContent.emit('display recipes');
  //   }
  //   if (link == 'shopping-list') {
  //     this.displayContent.emit('display shopping list');
  //   }
  // }
}
