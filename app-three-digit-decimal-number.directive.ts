import { Directive, ElementRef, ChangeDetectorRef, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';

@Directive({
  selector: '[appAppThreeDigitDecimalNumber]'
})
export class AppThreeDigitDecimalNumberDirective implements OnChanges {
  @Input() value: string;
  @Output() ngModelChange = new EventEmitter();
  private regex: RegExp = new RegExp(/^[1-9]$|^[1-9][0-9]$|^(100)$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  count: number;
  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {
  }
  ngOnChanges(changes: SimpleChanges) {
    const newValue = changes.value.currentValue;
    this.el.nativeElement.value = changes.value.currentValue || '';
    if (newValue) {
      const patternValidation = newValue.match(this.regex);
      if (newValue.length > 3 || !patternValidation) {
        this.el.nativeElement.value = changes.value.previousValue || '';
      }
      this.ngModelChange.emit(this.el.nativeElement.value);
      this.cdr.detectChanges();
    }
  }
}
