import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipes } from '../recipes.module';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
    @Output() recipeWasSelected = new EventEmitter<Recipes>();
    recipes: Recipes[] = [
    new Recipes('Recipes one','this is simply test',
     '../../assets/recipelogo1.jpeg'),

     new Recipes('Recipes two','this is simply test',
     '../../assets/recipelogo2.jpeg'),

     new Recipes('Recipes three','this is simply test',
     '../../assets/recipelogo3.jpeg')

    ];
  constructor() { }

  ngOnInit(): void {
  }
  onRecipeSelected(recipe: Recipes){
    this.recipeWasSelected.emit(recipe);
  }
}
