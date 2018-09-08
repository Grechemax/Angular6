import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingSrv: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingSrv.getIngredients();
   this.subscription =  this.shoppingSrv.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
    }
      );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
}
  onEditItem(ind) {
    console.log(ind);
    this.shoppingSrv.startingEditing.next(ind); // эммитируем индекс выбранного эл.
  }
}
