import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredients.module';
import { ShoppingService } from '../shopping.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  onAdd(){
    const nameIng = this.name.nativeElement.value;
    const amountIng = this.amount.nativeElement.value;
    const newIngredient = new Ingredient(nameIng, amountIng);
    this.shoppingService.addIngredient(newIngredient);
  }
  onClear() {
    this.name.nativeElement.value = '';
    this.amount.nativeElement.value = '';
  }
}
