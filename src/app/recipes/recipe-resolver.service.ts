import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Recipes } from './recipes.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipes[]> {

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();

    if(recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    }else {
      recipes;
    }
  }
}
