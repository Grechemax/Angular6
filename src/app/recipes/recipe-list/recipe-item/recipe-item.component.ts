import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../recipe.model";
import {RecipeSService} from "../../recipe-s.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
 @Input('rcpItem') recipe: Recipe;
 @Input() rcpID: number;
  ngOnInit() {
  }

}
