import {Component, OnInit} from '@angular/core';
import {AccountEntity} from "@domain/entities/account/account.entity";
import {CacheStorage} from "@infrastructure/adapters/out/storage/cache/cache.storage";

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
