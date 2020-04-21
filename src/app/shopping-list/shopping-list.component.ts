import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.module';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingService]
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingService.ingredientsChange.subscribe(
      (ingredients: Ingredient[]) =>{
          this.ingredients = ingredients;
      }
    );
  }
}
