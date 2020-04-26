import { Component, OnInit } from '@angular/core';
import { Recipes } from './recipes.module';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  SelectedRecipe: Recipes;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.selectedRecipe.subscribe(
      (recipe : Recipes) => {
        this.SelectedRecipe = recipe;
      }
    );
  }

}
