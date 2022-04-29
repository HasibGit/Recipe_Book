import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  id: number;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id'] != null) {
        this.editMode = true;
        this.id = +params['id'];
        this.initializeForm();
      }
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  private initializeForm() {
    let recipeName = '';
    let imagePath = '';
    let recipeDescription = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);

      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }

    this.recipeForm = new FormGroup({
      Name: new FormControl(recipeName, [Validators.required]),
      ImagePath: new FormControl(imagePath, [Validators.required]),
      Description: new FormControl(recipeDescription, [Validators.required]),
    });
  }
}
