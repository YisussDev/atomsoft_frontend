import {Component, OnInit} from '@angular/core';
import {FindAllApplicationUseCase} from "@application/ports/in/application/find-all-application.use-case";
import {CacheStorage} from "@infrastructure/adapters/out/storage/cache/cache.storage";

@Component({
  selector: 'app-view',
  template: `
    <router-outlet></router-outlet>
  `
})
export class ViewComponent implements OnInit {

  constructor(
    private findAllApplicationUseCase: FindAllApplicationUseCase,
    private _cacheStorage: CacheStorage,
  ) {
  }

  ngOnInit() {
    this.initApps();
  }

  private initApps(): void {
    this.findAllApplicationUseCase.execute({}).subscribe({
      next: (response) => {
        console.log(response);
      }
    });
  }

}
