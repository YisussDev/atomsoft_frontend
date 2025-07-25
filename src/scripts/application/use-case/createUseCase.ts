import * as fs from 'fs';
import * as buffer from 'buffer';
import {OperationsModel} from "../../utils/operations.model";

export class CreateUseCase extends OperationsModel {

  constructor() {
    super();
  }

  static constructModule(pathEntities: string, pathEntitiesExample: string) {

    const crudActions: string[] = ["get-all", "get-one", "create", "update", "delete"];

    const namePrincipalModule: string = process.argv[2].toLowerCase().trim(); // Example: hello-world
    const nameSecondModule: string = process.argv[3]; //Example: hello-world
    // const nameModule: string = this.convertNamePath(nameSecondModule) // Example: HelloWorld;
    // const nameFileClass: string = this.convertNameFile(nameModule);// Example: HelloWorld;
    if (nameSecondModule) {
      let nameSecondModuleSnakeCase = nameSecondModule.trim().toLowerCase();
      let nameFileClass = this.convertNamePath((nameSecondModuleSnakeCase + '-' + namePrincipalModule));
      let nameModule = this.convertNameFile(this.convertNamePath(namePrincipalModule));
      let nameSecondModuleCamelCase = this.convertNameFile(nameFileClass);
      this.createFolderUseCase(pathEntities, namePrincipalModule, (nameSecondModuleSnakeCase + '-' + namePrincipalModule));
      this.createFileModule(pathEntities, pathEntitiesExample, namePrincipalModule, (nameSecondModuleSnakeCase + '-' + namePrincipalModule), nameModule, nameSecondModuleSnakeCase, nameSecondModuleCamelCase);
    } else {
      for (const action of crudActions) {
        let nameSecondModuleSnakeCase = action.trim().toLowerCase();
        let nameFileClass = this.convertNamePath((nameSecondModuleSnakeCase + '-' + namePrincipalModule));
        let nameModule = this.convertNameFile(this.convertNamePath(namePrincipalModule));
        let nameSecondModuleCamelCase = this.convertNameFile(nameFileClass);
        this.createFolderUseCase(pathEntities, namePrincipalModule, (nameSecondModuleSnakeCase + '-' + namePrincipalModule));
        this.createFileModule(pathEntities, pathEntitiesExample, namePrincipalModule, (nameSecondModuleSnakeCase + '-' + namePrincipalModule), nameModule, action.trim().toLowerCase(), nameSecondModuleCamelCase);
      }
    }
  }

  private static createFileModule(
    pathEntities: string,
    pathEntityExample: string,
    namePrincipalModule: string,
    nameSecondModule: string,
    nameFileClass: string,
    nameUseCaseSnakeCase?: string,
    nameUseCaseCamelCase?: string
  ) {
    fs.readFile(
      pathEntityExample,
      "utf8",
      (err: any, text: string) => {
        const data = new Uint8Array(
          buffer.Buffer.from(
            this.replaceNamesInFileUseCase(
              text,
              namePrincipalModule,
              nameSecondModule,
              nameFileClass,
              (nameUseCaseSnakeCase),
              (nameUseCaseCamelCase)
            )
          )
        );
        if (
          !fs.existsSync(`${pathEntities}/${namePrincipalModule}/${nameSecondModule}/${nameUseCaseSnakeCase}-${namePrincipalModule}-use-case.ts`)
        ) fs.writeFileSync(`${pathEntities}/${namePrincipalModule}/${nameSecondModule}/${nameUseCaseSnakeCase}-${namePrincipalModule}-use-case.ts`, data);
      }
    );
  }

}
