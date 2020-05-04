import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredients.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  //exportAs: 'app-shopping-edit'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm : NgForm;
  subcription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.subcription = this.shoppingService.startEditing.subscribe(
      (index : number) =>{
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onAdd( form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.shoppingService.updateIngredients(this.editedItemIndex, newIngredient);
    }else {
      this.shoppingService.addIngredient(newIngredient);
    }

  }
   onClear() {
     this.slForm.reset();
     this.editMode= false;
   }
   onDelete() {
     this.shoppingService.deleteIngredient(this.editedItemIndex);
     this.onClear();
   }
  ngOnDestroy(){
    this.subcription.unsubscribe();
  }
}
