// import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
// import {ActivatedRoute, Router} from "@angular/router";
// import {PaginationInterface} from "@core-interfaces/tables/pagination.interface";
// import {FormBuilder} from "@angular/forms";
// import {Subscription} from "rxjs";
// import {generateQuerySearchUrl} from "@core-helpers/table/helper-table";
//
// @Component({
//   selector: 'app-pagination',
//   templateUrl: './pagination.component.html',
//   styleUrls: ['./pagination.component.css'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class PaginationComponent implements OnInit, OnDestroy {
//
//   @Input() public pagination!: PaginationInterface;
//
//   @Input() public tableLimitList: number[] = [];
//   @Input() public tableLimit: number = 10;
//
//   @Output() public eventChangeLimit: EventEmitter<number> = new EventEmitter<number>();
//
//   private listenQueryParams$!: Subscription;
//
//
//   private params: any;
//
//   constructor(
//     private _router: Router,
//     private _activatedRoute: ActivatedRoute
//   ) {
//   }
//
//   ngOnInit(): void {
//     this.initListenQueryParams();
//   }
//
//   private initListenQueryParams(): void {
//     this.listenQueryParams$ = this._activatedRoute.queryParams.subscribe(params => {
//       this.params = params;
//     });
//   }
//
//   public changePage(pageLink: any) {
//     const queryString = pageLink.split("?")[1];
//     const params = new URLSearchParams(queryString);
//     const page = params.get('page');
//     const queryGenerated = generateQuerySearchUrl(this.params);
//     const path = window.location.pathname;
//     this._router.navigateByUrl(`${path}?page=${page}${queryGenerated}`)
//   }
//
//   public changeTableLimit(limit: number): void {
//     this.eventChangeLimit.emit(limit);
//   }
//
//   ngOnDestroy() {
//     this.listenQueryParams$.unsubscribe();
//   }
//
// }
