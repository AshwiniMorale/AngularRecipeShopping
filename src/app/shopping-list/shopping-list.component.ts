import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  //providers: [ShoppingService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  private igChangedSub: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();

    this.igChangedSub= this.shoppingService.ingredientsChange.subscribe(
      (ingredientsL : Ingredient[]) => {
          this.ingredients = ingredientsL;
      }
    );
  }

  onEditItem(index: number) {
    this.shoppingService.startEditing.next(index);
  }

  ngOnDestroy() {
    this.igChangedSub.unsubscribe();
  }
}
