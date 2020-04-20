import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipes } from '../../recipes.module';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
 @Input() recipe: Recipes;
 @Output() selectedRecipe = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }
  onSelectRecipe(){
    this.selectedRecipe.emit();
  }
}
