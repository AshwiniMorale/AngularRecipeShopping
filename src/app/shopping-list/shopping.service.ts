import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredients.model';

export class ShoppingService{
  ingredientsChange = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('tomato', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  addIngredient(ingredientL: Ingredient) {
    this.ingredients.push(ingredientL);
    this.ingredientsChange.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for(let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(... ingredients);
    this.ingredientsChange.next(this.ingredients.slice());
  }

  updateIngredients(index: number, newIngredient: Ingredient) {
      this.ingredients[index] = newIngredient;
      this.ingredientsChange.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChange.next(this.ingredients.slice());
  }
}
