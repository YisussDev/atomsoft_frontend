// import {Component, OnDestroy, OnInit} from '@angular/core';
// import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// import {AsideService} from "../../../aside/services/aside.service";
// import * as moment from "moment";
// import {distinctUntilChanged, Subject, takeUntil} from "rxjs";
// import {validatorDateMin} from "../../../inputs/validators/validator-date-min";
// import {TableColumnConfigInterface} from "@core-interfaces/tables/table-column-config.interface";
//
// @Component({
//   selector: 'app-export-data-table',
//   templateUrl: './export-data-table.component.html',
//   styleUrls: ['./export-data-table.component.css']
// })
// export class ExportDataTableComponent implements OnInit, OnDestroy {
//
//   public data: TableColumnConfigInterface[] = [];
//   public formDate!: FormGroup;
//
//   private _subscriber: Subject<void> = new Subject<void>();
//
//   constructor(
//     private _formBuilder: FormBuilder,
//     private asideService: AsideService,
//   ) {
//   }
//
//   ngOnInit() {
//     this.initForm();
//     this.initListenChangeInitialDate();
//   }
//
//   private initForm(): void {
//     this.formDate = this._formBuilder.group({
//       initial_date: [moment().format('YYYY-MM-DD'), Validators.required],
//       final_date: [moment().format('YYYY-MM-DD'), Validators.required],
//     });
//     this.data.forEach(columnConfig => {
//       if (columnConfig.column_type == "select" && columnConfig.column_search) {
//         this.formDate.addControl(columnConfig.column_name, this._formBuilder.control(''));
//       }
//     });
//   }
//
//   public sendData(): void {
//     this.asideService.closeAside.next({data: this.formDate.value, eventName: 'EXPORT_DATA'});
//   }
//
//   private initListenChangeInitialDate(): void {
//     const {initial_date, final_date} = this.formDate.controls;
//
//     initial_date.valueChanges.pipe(
//       takeUntil(this._subscriber),
//       distinctUntilChanged() // solo continúa si el valor ha cambiado
//     ).subscribe(valueInitial => {
//       final_date.clearValidators();
//       final_date.addValidators([Validators.required, validatorDateMin(valueInitial)]);
//       final_date.markAsTouched();
//       final_date.updateValueAndValidity();
//     });
//
//     final_date.valueChanges.pipe(
//       takeUntil(this._subscriber),
//       distinctUntilChanged() // solo continúa si el valor ha cambiado
//     ).subscribe(valueFinal => {
//       final_date.clearValidators();
//       final_date.addValidators([Validators.required, validatorDateMin(initial_date.value)]);
//       final_date.markAsTouched();
//       final_date.updateValueAndValidity();
//     });
//   }
//
//   ngOnDestroy() {
//     this._subscriber.next();
//     this._subscriber.complete();
//   }
//
// }
