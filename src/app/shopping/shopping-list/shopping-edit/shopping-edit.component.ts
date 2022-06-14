import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit 
{
  @ViewChild("nameInput", { static: false })
  private name: ElementRef;
  @ViewChild("amountInput", { static: false })
  private amount: ElementRef;
  @Output("onAdd")
  readonly onSubmitEvent: EventEmitter<Ingredient> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  onSubmitClick(): void
  {
    this.onSubmitEvent.emit(
      new Ingredient(
      this.name.nativeElement.value, 
      this.amount.nativeElement.value
      )
    );
  }
}
