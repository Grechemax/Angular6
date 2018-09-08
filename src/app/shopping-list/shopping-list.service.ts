import {Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // ingredientAdded = new EventEmitter<Ingredient>(); // my approach
  ingredientsChanged = new Subject<Ingredient[]>(); // EventEmitter заменили сабджектом
  startingEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('bread', 11),
    new Ingredient('butter', 31),
    new Ingredient('eggs', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(ind) {
    return this.ingredients[ind];
  }
  // constructor() {this.ingredientAdded.subscribe( // мой подход для добавления нового ингред.
  //   (ingredientRecieved: Ingredient) => (this.ingredients.push(ingredientRecieved))); // но можно просто через метод передать параметр и использовать тут
  // }
  addIngredient(ingr: Ingredient) {
    this.ingredients.push(ingr);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredientsToShoppingList(ingReceived: Ingredient[]) {
    console.log(ingReceived);
    this.ingredients.push(...ingReceived);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(newIngr: Ingredient, ind) {
    this.ingredients[ind] = newIngr;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngr(ind: number) {
    this.ingredients.splice(ind, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}



