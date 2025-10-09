import {NgModule} from "@angular/core";
import {FindAllApplicationUseCase} from "@application/ports/in/application/find-all-application.use-case";
import {FindOneApplicationUseCase} from "@application/ports/in/application/find-one-application.use-case";
import {CreateApplicationUseCase} from "@application/ports/in/application/create-application.use-case";
import {UpdateApplicationUseCase} from "@application/ports/in/application/update-application.use-case";
import {DeleteApplicationUseCase} from "@application/ports/in/application/delete-application.use-case";

@NgModule({
  imports: [
    // ...Implementations
  ],
  providers: [
    FindAllApplicationUseCase,
    FindOneApplicationUseCase,
    CreateApplicationUseCase,
    UpdateApplicationUseCase,
    DeleteApplicationUseCase,
  ]
})
export class ApplicationCompositionModule {
}
