import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class CacheStorage {

  public changeData: Subject<{ key: dataAllowType, data: any }> = new Subject<{ key: dataAllowType, data: any }>();

  private dataCache: Map<dataAllowType, { value: any; expiry: number | null }> = new Map();

  public setByKey(key: dataAllowType, value: any, ttl?: number): void {
    const expiry = ttl ? Date.now() + ttl : null;
    this.dataCache.set(key, {value, expiry});
    this.changeData.next({key, data: value});
  }

  public getByKey(key: dataAllowType): any {
    const cachedItem = this.dataCache.get(key);

    if (!cachedItem) return null;

    const {value, expiry} = cachedItem;

    if (expiry && Date.now() > expiry) {
      this.dataCache.delete(key);
      return null;
    }

    return value;
  }

  public deleteByKey(key: dataAllowType): void {
    this.dataCache.delete(key);
  }

  public clearCache(): void {
    this.dataCache.clear();
  }

}

export type dataAllowType =
  "_account_data" |
  "_app_list_data" |
  "_apps_charged" |
  "_licenses_charged" |
  "_customer_carged"
  ;
