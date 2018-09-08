import {Component,  OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeSService} from "../recipe-s.service";
import {relativeToRootDirs} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

   constructor(private shopSRV: ShoppingListService,
               private recipeSRV: RecipeSService,
               private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit() {
     this.route.params
       .subscribe(
         (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeSRV.getRecipe(this.id);
         }
       );
  }

  onSendToShopping() {
    this.shopSRV.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  // {path: ':id/edit', component: RecipeEditComponent} //localhost:4200/recipes/2/edit

  onEditRecipe() {
     this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
