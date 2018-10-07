import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeSService} from "../recipe-s.service";
import {Recipe} from "../recipe.model";

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
              private recipeSrv: RecipeSService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['desc'],
    //   this.recipeForm.value['ingredients']
    // );
    if (this.editMode) {
      this.recipeSrv.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeSrv.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);  }

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
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImgPath),
      'desc': new FormControl(recipeDescr),
      'ingredients' : recipeIngredients
    });
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
