import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'counter-input',
  templateUrl: 'counter-input.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CounterInputComponent),
    multi: true
  }]
})
export class CounterInputComponent implements ControlValueAccessor {

  @Input() counterValue: number;

  private propagateChange: any = {};

  increment() {
    this.counterValue++;
    this.propagateChange(this.counterValue);//值传递
  }

  decrement() {
    this.counterValue--;
    this.propagateChange(this.counterValue);//值传递
  }
  
  /*实现ControlValueAccessor接口部分*/
  writeValue(val: number): void {
    if (val) {
      this.counterValue = val;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  setDisabledState?(isDisabled: boolean): void {

  }

  constructor() {
   
  }

}
