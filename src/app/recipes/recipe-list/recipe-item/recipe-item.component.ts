import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css', '../../../../styles.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeItem: Recipe;

  @Input() recipeId: number;

  @Output() displayRecipe = new EventEmitter<Recipe>();

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onClick(recipe: Recipe, id: number) {
    console.log(id);
    this.recipeService.displaySelectedRecipe(recipe);
    this.router.navigate(['recipe/' + id], { relativeTo: this.route });
  }
}
