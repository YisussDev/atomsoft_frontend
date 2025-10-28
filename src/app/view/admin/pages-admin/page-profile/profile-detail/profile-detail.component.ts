import {Component, OnInit} from '@angular/core';
import {CacheStorage} from "@infrastructure/adapters/out/storage/cache/cache.storage";
import {AccountEntity} from "@domain/entities/account/account.entity";

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  public dataAccount!: AccountEntity;

  constructor(
    private _cacheStorage: CacheStorage
  ) {
  }

  ngOnInit() {
    this.initDataAccount();
  }

  private initDataAccount(): void {
    this.dataAccount = this._cacheStorage.getByKey("_account_data");
  }
}
