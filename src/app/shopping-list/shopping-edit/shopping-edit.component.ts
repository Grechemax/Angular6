import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
   @ViewChild('sf') shoppingForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editingIngredient: Ingredient;
  editingIngredientIndex: number;
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingService.startingEditing // подхватываем индекс из шопинг листа.
      .subscribe(
        (i: number) => {
          this.editMode = true;
          this.editingIngredientIndex = i; // передаем index элемента из массива в инпуты формы
          this.editingIngredient = this.shoppingService.getIngredient(i);
          this.shoppingForm.setValue(this.editingIngredient);
        }
      );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onIngredientAdd(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const ingName = form.value.name;
    const ingAmount = form.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    // this.shoppingService.ingredientAdded.emit(ingredient); // переменная в классе.емит(что емитим)
    if (this.editMode) {
      this.shoppingService.updateIngredient(newIngredient, this.editingIngredientIndex);
    } else {
      this.shoppingService.addIngredient(newIngredient); // или исп. метод в сервисе и сразу помещать что емитим.
    }

    form.reset();
    this.editMode = false;
  }



  deleteIngredient() {
    this.shoppingService.deleteIngr(this.editingIngredientIndex);
    this
  }

  clear(form: FormControl) {
    form.reset();
    // this.editMode = false;
  }
}
