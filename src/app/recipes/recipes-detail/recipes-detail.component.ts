import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipes } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
recipe: Recipes;
id: number;
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
  this.route.params.subscribe(
        (param: Params) => {
          this.id = +param['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }
  onAddToShoppingList(){
    this.recipeService.addIngredientsToShopingList(this.recipe.ingredients);
  }
  onClickEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../']);
  }
}
