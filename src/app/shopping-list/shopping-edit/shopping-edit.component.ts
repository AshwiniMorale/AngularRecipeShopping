import { Component, OnInit, ViewChild, EventEmitter, ElementRef, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredients.module';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit(): void {
  }

  onAdd(){
    const nameIng = this.name.nativeElement.value;
    const amountIng = this.amount.nativeElement.value;
    const newIngredient = new Ingredient(nameIng, amountIng);
    this.ingredientAdded.emit(newIngredient);
  }
  onClear() {
    this.name.nativeElement.value = '';
    this.amount.nativeElement.value = '';
  }
}
