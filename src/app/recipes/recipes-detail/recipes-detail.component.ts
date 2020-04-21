import { Component, OnInit, Input } from '@angular/core';
import { Recipes } from '../recipes.module';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
@Input() recipe: Recipes;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
  onAddToShoppingList(){
    this.recipeService.addIngredientsToShopingList(this.recipe.ingredients);
  }
}
