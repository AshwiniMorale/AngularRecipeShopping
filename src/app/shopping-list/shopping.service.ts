import { EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredients.module';

export class ShoppingService{
  ingredientsChange = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('tomato', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(ingredientL: Ingredient) {
    this.ingredients.push(ingredientL);
    this.ingredientsChange.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for(let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(... ingredients);
    this.ingredientsChange.emit(this.ingredients.slice());
  }
}
