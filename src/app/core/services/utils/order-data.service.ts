import {Injectable} from '@angular/core';

@Injectable()
export class OrderDataService {

  constructor() {
  }

  public orderAscData(data: any[], property: string): any[] {
    return data.sort((a: any, b: any) => {
      const getValue = (obj: any, propPath: string): any => {
        return propPath.split('.').reduce((acc, key) => acc?.[key], obj);
      };

      const aValue = getValue(a, property);
      const bValue = getValue(b, property);

      if (aValue < bValue) {
        return -1;
      }
      if (aValue > bValue) {
        return 1;
      }
      return 0;
    });
  }


  public orderDesData(data: any[], property: string): any[] {
    return data.sort((a: any, b: any) => {
      const getValue = (obj: any, propPath: string): any => {
        return propPath.split('.').reduce((acc, key) => acc?.[key], obj);
      };

      const aValue = getValue(a, property);
      const bValue = getValue(b, property);

      if (aValue > bValue) {
        return -1;
      }
      if (aValue < bValue) {
        return 1;
      }
      return 0;
    });
  }

}
