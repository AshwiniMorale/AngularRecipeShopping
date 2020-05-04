import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipes } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  subcription: Subscription;
  recipes: Recipes[] = [];
  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subcription = this.recipeService.recipeChanged.subscribe(
      (recipes: Recipes[]) => {
          this.recipes = recipes;
      }
    );
    this.recipes= this.recipeService.getRecipes()
  }
  onClickNew(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
