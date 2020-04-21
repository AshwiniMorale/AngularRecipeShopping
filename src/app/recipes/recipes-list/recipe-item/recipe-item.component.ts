import { Component, OnInit, Input } from '@angular/core';
import { Recipes } from '../../recipes.module';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
 @Input() recipe: Recipes;

  constructor(private recepeService: RecipeService) { }

  ngOnInit(): void {
  }
  onSelectRecipe(){
    this.recepeService.selectedRecipe.emit(this.recipe);
  }
}
