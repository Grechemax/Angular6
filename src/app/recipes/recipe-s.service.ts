import {Recipe} from "./recipe.model";
import { Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";


@Injectable({
  providedIn: 'root'
})
export class RecipeSService {


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
      'http://joyofbaking.com/images/biscuits.jpg',
      [new Ingredient('eggs', 34),
      new Ingredient('sugar', 200),
      new Ingredient('milk', 500)
      ],

      )
  ];

  getRecipes() {
    return this.recipes.slice(); // slice is needed to return a new  - exact copy
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

}
