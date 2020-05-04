import { Injectable } from '@angular/core';

import { Recipes } from './recipes.model'
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{

  recipeChanged = new Subject<Recipes[]>();

  // private recipes: Recipes[] = [
  //   new Recipes('Burger','Burger is just awesome',
  //    '../../assets/recipelogo1.jpeg',
  //     [
  //       new Ingredient('Bread', 7),
  //       new Ingredient('meat', 5)
  //     ]),

  //    new Recipes('Maggi','Maggi is just awesome',
  //    '../../assets/recipelogo2.jpeg',
  //     [
  //       new Ingredient('Potato', 7),
  //       new Ingredient('meat', 5)
  //     ]),

  //    new Recipes('Noodles','Very testy noodles',
  //    '../../assets/recipelogo3.jpeg',
  //    [
  //     new Ingredient('Tomato', 7),
  //     new Ingredient('meat', 5)
  //    ])
  //   ];

    private recipes: Recipes[] = [];
    constructor(private shoppingService: ShoppingService) {}

    setRecipes(recipes: Recipes[]) {
      this.recipes = recipes;
      this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes(){
      return this.recipes.slice();
    }

    getRecipe(index: number) {
      return this.recipes[index];
    }
    addIngredientsToShopingList(ingredients: Ingredient[]) {
      this.shoppingService.addIngredients(ingredients);
    }
    addRecipe(recipe: Recipes) {
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipes) {
      this.recipes[index] = newRecipe;
      this.recipeChanged.next(this.recipes.slice());

    }
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}
