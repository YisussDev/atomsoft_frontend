import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LocalstorageStorage {

  public setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error guardando en localStorage', error);
    }
  }

  public getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error recuperando de localStorage', error);
      return null;
    }
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
