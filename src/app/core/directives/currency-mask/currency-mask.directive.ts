import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCurrencyMask]',
  standalone: true
})
export class CurrencyMaskDirective implements OnInit {
  @Input() currencySymbol: string = '$';
  @Input() decimalPlaces: number = 2;
  @Input() thousandsSeparator: string = ',';
  @Input() decimalSeparator: string = '.';

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private ngControl: NgControl
  ) {}

  ngOnInit(): void {
    // Formatear valor inicial con decimales completos
    const control = this.ngControl.control;
    if (control && control.value !== null && control.value !== undefined) {
      const value = parseFloat(control.value.toString());
      if (!isNaN(value)) {
        const formatted = this.formatValueComplete(value.toFixed(this.decimalPlaces));
        this.el.nativeElement.value = formatted;
      }
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: InputEvent): void {
    const input = this.el.nativeElement;
    const cursorPosition = input.selectionStart || 0;
    const oldValue = input.value;
    const oldLength = oldValue.length;

    // Extraer solo números y punto decimal
    let numbers = oldValue.replace(/[^\d.]/g, '');

    // Permitir solo un punto decimal
    const parts = numbers.split('.');
    if (parts.length > 2) {
      numbers = parts[0] + '.' + parts.slice(1).join('');
    }

    // Limitar decimales
    if (parts.length === 2 && parts[1].length > this.decimalPlaces) {
      numbers = parts[0] + '.' + parts[1].substring(0, this.decimalPlaces);
    }

    // Si está vacío
    if (!numbers || numbers === '.') {
      input.value = '';
      this.ngControl.control?.setValue(null, { emitEvent: false });
      return;
    }

    // Actualizar control con valor numérico
    const numericValue = parseFloat(numbers);
    this.ngControl.control?.setValue(isNaN(numericValue) ? null : numericValue, { emitEvent: false });

    // Formatear display sin agregar decimales si el usuario no los ha ingresado
    const formatted = this.formatValue(numbers, numbers.includes('.'));
    input.value = formatted;

    // Calcular nueva posición del cursor
    const newLength = formatted.length;
    const lengthDiff = newLength - oldLength;
    let newCursorPosition = cursorPosition + lengthDiff;

    // Ajustar cursor para que no se posicione sobre el símbolo o separadores
    const symbolLength = this.currencySymbol.length + 1; // símbolo + espacio
    if (newCursorPosition <= symbolLength) {
      newCursorPosition = symbolLength;
    }

    // Restaurar posición del cursor
    requestAnimationFrame(() => {
      input.setSelectionRange(newCursorPosition, newCursorPosition);
    });
  }

  @HostListener('blur')
  onBlur(): void {
    const control = this.ngControl.control;
    if (control && control.value !== null && control.value !== undefined) {
      // Formatear con decimales completos al salir
      const value = parseFloat(control.value.toString());
      if (!isNaN(value)) {
        const formatted = this.formatValueComplete(value.toFixed(this.decimalPlaces));
        this.el.nativeElement.value = formatted;
      }
    }
  }

  @HostListener('focus')
  onFocus(): void {
    // No seleccionar todo, dejar que el usuario posicione el cursor
  }

  private formatValueComplete(value: string | number): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const strValue = value.toString();
    const parts = strValue.split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1] || '';

    // Formatear parte entera con separadores de miles
    integerPart = this.addThousandsSeparator(integerPart);

    // Construir valor formateado
    let formatted = `${this.currencySymbol} ${integerPart}`;

    if (this.decimalPlaces > 0) {
      const decimals = decimalPart.padEnd(this.decimalPlaces, '0').substring(0, this.decimalPlaces);
      formatted += `${this.decimalSeparator}${decimals}`;
    }

    return formatted;
  }

  private formatValue(value: string | number, hasDecimalPoint: boolean = false): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const strValue = value.toString();
    const parts = strValue.split('.');
    let integerPart = parts[0] || '0';
    const decimalPart = parts[1] || '';

    // Formatear parte entera con separadores de miles
    integerPart = this.addThousandsSeparator(integerPart);

    // Construir valor formateado
    let formatted = `${this.currencySymbol} ${integerPart}`;

    // Solo agregar decimales si el usuario ha ingresado el punto o es blur
    if (this.decimalPlaces > 0 && hasDecimalPoint) {
      formatted += `${this.decimalSeparator}${decimalPart}`;
    }

    return formatted;
  }

  private addThousandsSeparator(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
  }
}
