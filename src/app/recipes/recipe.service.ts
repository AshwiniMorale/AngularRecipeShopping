import { EventEmitter, Injectable } from '@angular/core';

import { Recipes } from './recipes.module'
import { Ingredient } from '../shared/ingredients.module';
import { ShoppingService } from '../shopping-list/shopping.service';

@Injectable()
export class RecipeService{
  selectedRecipe = new EventEmitter<Recipes>();
  private recipes: Recipes[] = [
    new Recipes('Burger','Burger is just awesome',
     '../../assets/recipelogo1.jpeg',
      [
        new Ingredient('Bread', 7),
        new Ingredient('meat', 5)
      ]),

     new Recipes('Maggi','Maggi is just awesome',
     '../../assets/recipelogo2.jpeg',
      [
        new Ingredient('Potato', 7),
        new Ingredient('meat', 5)
      ]),

     new Recipes('Noodles','Very testy noodles',
     '../../assets/recipelogo3.jpeg',
     [
      new Ingredient('Tomato', 7),
      new Ingredient('meat', 5)
     ])
    ];

    constructor(private shoppingService: ShoppingService) {}
    getRecipes(){
      return this.recipes.slice();
    }

    addIngredientsToShopingList(ingredients: Ingredient[]) {
      this.shoppingService.addIngredients(ingredients);
    }
}
