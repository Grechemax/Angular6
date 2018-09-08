import { Component, OnInit } from '@angular/core';
import {RecipeSService} from "./recipe-s.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeSService]
})
export class RecipesComponent implements OnInit {


  constructor() { }

  ngOnInit() {}
}
