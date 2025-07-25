import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-button-square-link',
  templateUrl: './button-square-link.component.html',
  styleUrls: ['./button-square-link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonSquareLinkComponent {

  @Input() public size!: 'sm' | 'md' | 'bg';
  @Input() public text!: string;
  @Input() public path!: string;
  @Input() public icon!: string;
  @Input() public classActivated!: string;
  @Input() public disabled: boolean = false;
  @Input() public backgroundColor!: string;
  @Input() public color!: string;

  constructor(
    private _router: Router,
    private _cdr: ChangeDetectorRef
  ) {
  }

  public goToPath(): void {
    if (this.disabled) return;
    this._router.navigateByUrl(this.path || '/');
    this._cdr.detectChanges();
  }

}
