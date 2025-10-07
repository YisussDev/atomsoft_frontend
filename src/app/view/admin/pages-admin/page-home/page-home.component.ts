import {Component, OnInit} from '@angular/core';
import {CacheStorage} from "@infrastructure/adapters/storage/cache/cache.storage";
import {AccountEntity} from "@domain/entities/account/account.entity";

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  public account!: AccountEntity;

  constructor(
    private cacheStorage: CacheStorage
  ) {
  }

  ngOnInit() {
    this.initAccount();
  }

  private initAccount(): void {
    this.account = this.cacheStorage.getByKey("_account_data");
  }

}
