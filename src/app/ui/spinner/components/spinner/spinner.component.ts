import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  public isActive: boolean = false;
  public closing: boolean = false;

  constructor(
    private spinnerService: SpinnerService
  ) {
  }

  ngOnInit() {
    this.toggle();
  }

  private toggle() {
    this.spinnerService.changeStatus.subscribe({
      next: (status: boolean) => {
        this.isActive = status;
      }
    });
  }


}
