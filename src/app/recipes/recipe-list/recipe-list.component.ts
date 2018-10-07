import {Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from "../recipe.model";
import {RecipeSService} from "../recipe-s.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeSrv: RecipeSService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeSrv.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
    // this.recipes = this.recipeSrv.getRecipes();
    this.recipeSrv.fetchData(); // my decision to get all recipes from server initially
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
