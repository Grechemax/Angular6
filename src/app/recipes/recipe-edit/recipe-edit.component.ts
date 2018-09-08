import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {RecipeSService} from "../recipe-s.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
  private recipeSrv: RecipeSService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
          console.log(this.getControls());
        }
      );
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescr = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeSrv.getRecipe(this.id);
      console.log(recipe);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescr = recipe.desc;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) { // getting array of ingredients
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImgPath),
      'desc': new FormControl(recipeDescr),
      'ingredients' : recipeIngredients
    });
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
