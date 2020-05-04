import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipes } from '../recipes/recipes.model';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();

    this.http.put('https://my-first--angular-app.firebaseio.com/recipes.json', recipes).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetchRecipes() {
        return this.http.get<Recipes[]>(
          'https://my-first--angular-app.firebaseio.com/recipes.json',
        ) //httpget()
    .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }), //map
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }) //tap
    ); // pipe
  }//fetch recipe


}
