import { Ingredient } from '../shared/ingredients.model';

export class Recipes {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(name: string, desc: string, image: string, ingredient: Ingredient[]){
    this.name = name;
    this.description = desc;
    this.imagePath = image;
    this.ingredients = ingredient;
  }
}
