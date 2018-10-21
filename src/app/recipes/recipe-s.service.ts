import {Recipe} from "./recipe.model";
import { Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs/Rx";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";


@Injectable({
  providedIn: 'root'
})
export class RecipeSService {

  constructor(
    private httpClient: HttpClient,
    private authSRV: AuthService
  ) {}
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'My first recipe of tasty meat',
      'medium rare',
      'https://cdn4.i-scmp.com/sites/default/files/styles/980x551/public/images/methode/2017/12/13/ff3ebef8-df1e-11e7-af98-bc68401a7f65_1280x720_173640.jpg?itok=HIZNYn1j',
       [new Ingredient('oil', 500),
         new Ingredient('meat', 200)]
    ),
    new Recipe(
      'Sticky chicken drumsticks',
      'Baste with reserved marinade during cooking. Chicken is cooked when juices are clear. Serve with salad.',
      'http://img.taste.com.au/gZCOq1zZ/w720-h480-cfill-q80/taste/2016/11/sticky-chicken-drumsticks-24162-1.jpeg',
      [new Ingredient('honey', 50),
      new Ingredient('drumsticks', 600),
      ]
    ),
    new Recipe(
      'Biscuit Recipe',
      'The American biscuit is very similar to the British scone\n' +
      'British scone',
      'https://i.ytimg.com/vi/dd1iRCadHkc/maxresdefault.jpg',
      [new Ingredient('eggs', 34),
      new Ingredient('sugar', 200),
      new Ingredient('milk', 500)
      ],
      )
  ];

  getRecipes() {
    return this.recipes; // slice is needed to return a new  - exact copy
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(i) {
    this.recipes.splice(i, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  saveData() {
    const token = this.authSRV.getToken();
    this.httpClient.put('https://recipe-book-3f457.firebaseio.com/recipes.json?auth=' + token, this.recipes)
      .subscribe(
        (resp: Response) => console.log(resp)
      );
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  fetchData() {
    const token = this.authSRV.getToken();
    this.httpClient.get<Recipe[]>('https://recipe-book-3f457.firebaseio.com/recipes.json?auth=' + token, {observe: 'body', responseType: 'json'})
      .subscribe(
        (resp) => {
          const recipes = resp;
          this.setRecipes(recipes);
          console.log(recipes);
           }
      );
  }
}


