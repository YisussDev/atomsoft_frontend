import * as process from "node:process";
import {ConvertParameter} from "../../hexagonal/utils/convert-parameter";
import {CreateFolders} from "../../hexagonal/utils/create-folders";
import {readFiles} from "../../hexagonal/utils/read-files";
import {ReplaceNames} from "../../hexagonal/utils/replace-names";
import {CreateFile} from "../../hexagonal/utils/create-file";
import * as buffer from "buffer";

const CreateApplicationApiGateway = () => {

  CreateApplicationInApiGateway();
  CreateApplicationOutApiGateway();

}

// Principals

const CreateApplicationInApiGateway = () => {

  const firstVariable: string = process.argv[2];

  if (!firstVariable) {
    console.warn('Falta 1 parametro...');
    return;
  }

  CreateUseCaseFindAllApiGateway(firstVariable);
  CreateUseCaseFindOneApiGateway(firstVariable);
  CreateUseCaseCreateApiGateway(firstVariable);
  CreateUseCaseUpdateApiGateway(firstVariable);
  CreateUseCaseDeleteApiGateway(firstVariable);
  // CreateUseCaseModuleApiGateway(firstVariable);

}

const CreateApplicationOutApiGateway = () => {

  const firstVariable: string = process.argv[2];

  if (!firstVariable) {
    console.warn('Falta 1 parametro...');
    return;
  }

  CreatePortApiGateway(firstVariable);

}

// IN

const CreateUseCaseFindAllApiGateway = (firstParameter: string) => {
  const sourceDestiny: string = `src/app/application/ports/in/${firstParameter}`;
  const sourceExample: string = "src/scripts/frontend/application/in/examples/find-all.example.application.in.txt";
  const namePrincipalModule: string = ConvertParameter(firstParameter);
  CreateFolders(sourceDestiny);
  const fileText: string | null = readFiles(sourceExample);
  if (!fileText) {
    console.log("Archivo de ejemplo no existe... ☢️");
    return;
  }
  const textTransformed: string = ReplaceNames(fileText,
    {
      "{{NamePrincipalModule}}": namePrincipalModule,
      "{{NameNormalModule}}": firstParameter,
    });
  const dataTransformed = new Uint8Array(buffer.Buffer.from(textTransformed));
  CreateFile(`${sourceDestiny}/find-all-${firstParameter}.use-case.ts`, dataTransformed);
}

const CreateUseCaseFindOneApiGateway = (firstParameter: string) => {
  const sourceDestiny: string = `src/app/application/ports/in/${firstParameter}`;
  const sourceExample: string = "src/scripts/frontend/application/in/examples/find-one.example.application.in.txt";
  const namePrincipalModule: string = ConvertParameter(firstParameter);
  CreateFolders(sourceDestiny);
  const fileText: string | null = readFiles(sourceExample);
  if (!fileText) {
    console.log("Archivo de ejemplo no existe... ☢️");
    return;
  }
  const textTransformed: string = ReplaceNames(fileText,
    {
      "{{NamePrincipalModule}}": namePrincipalModule,
      "{{NameNormalModule}}": firstParameter,
    });
  const dataTransformed = new Uint8Array(buffer.Buffer.from(textTransformed));
  CreateFile(`${sourceDestiny}/find-one-${firstParameter}.use-case.ts`, dataTransformed);
}

const CreateUseCaseCreateApiGateway = (firstParameter: string) => {
  const sourceDestiny: string = `src/app/application/ports/in/${firstParameter}`;
  const sourceExample: string = "src/scripts/frontend/application/in/examples/create.example.application.in.txt";
  const namePrincipalModule: string = ConvertParameter(firstParameter);
  CreateFolders(sourceDestiny);
  const fileText: string | null = readFiles(sourceExample);
  if (!fileText) {
    console.log("Archivo de ejemplo no existe... ☢️");
    return;
  }
  const textTransformed: string = ReplaceNames(fileText,
    {
      "{{NamePrincipalModule}}": namePrincipalModule,
      "{{NameNormalModule}}": firstParameter,
    });
  const dataTransformed = new Uint8Array(buffer.Buffer.from(textTransformed));
  CreateFile(`${sourceDestiny}/create-${firstParameter}.use-case.ts`, dataTransformed);
}

const CreateUseCaseUpdateApiGateway = (firstParameter: string) => {
  const sourceDestiny: string = `src/app/application/ports/in/${firstParameter}`;
  const sourceExample: string = "src/scripts/frontend/application/in/examples/update-one.example.application.in.txt";
  const namePrincipalModule: string = ConvertParameter(firstParameter);
  CreateFolders(sourceDestiny);
  const fileText: string | null = readFiles(sourceExample);
  if (!fileText) {
    console.log("Archivo de ejemplo no existe... ☢️");
    return;
  }
  const textTransformed: string = ReplaceNames(fileText,
    {
      "{{NamePrincipalModule}}": namePrincipalModule,
      "{{NameNormalModule}}": firstParameter,
    });
  const dataTransformed = new Uint8Array(buffer.Buffer.from(textTransformed));
  CreateFile(`${sourceDestiny}/update-${firstParameter}.use-case.ts`, dataTransformed);
}

const CreateUseCaseDeleteApiGateway = (firstParameter: string) => {
  const sourceDestiny: string = `src/app/application/ports/in/${firstParameter}`;
  const sourceExample: string = "src/scripts/frontend/application/in/examples/delete.example.application.in.txt";
  const namePrincipalModule: string = ConvertParameter(firstParameter);
  CreateFolders(sourceDestiny);
  const fileText: string | null = readFiles(sourceExample);
  if (!fileText) {
    console.log("Archivo de ejemplo no existe... ☢️");
    return;
  }
  const textTransformed: string = ReplaceNames(fileText,
    {
      "{{NamePrincipalModule}}": namePrincipalModule,
      "{{NameNormalModule}}": firstParameter,
    });
  const dataTransformed = new Uint8Array(buffer.Buffer.from(textTransformed));
  CreateFile(`${sourceDestiny}/delete-${firstParameter}.use-case.ts`, dataTransformed);
}

const CreateUseCaseModuleApiGateway = (firstParameter: string) => {
  const sourceDestiny: string = `src/app/application/ports/in/${firstParameter}`;
  const sourceExample: string = "src/scripts/frontend/application/in/examples/module.example.application.in.txt";
  const namePrincipalModule: string = ConvertParameter(firstParameter);
  CreateFolders(sourceDestiny);
  const fileText: string | null = readFiles(sourceExample);
  if (!fileText) {
    console.log("Archivo de ejemplo no existe... ☢️");
    return;
  }
  const textTransformed: string = ReplaceNames(fileText,
    {
      "{{NamePrincipalModule}}": namePrincipalModule,
      "{{NameNormalModule}}": firstParameter,
    });
  const dataTransformed = new Uint8Array(buffer.Buffer.from(textTransformed));
  CreateFile(`${sourceDestiny}/${firstParameter}.use-case.module.ts`, dataTransformed);
}

// OUT

const CreatePortApiGateway = (firstParameter: string) => {
  const sourceDestiny: string = `src/app/application/ports/out/${firstParameter}`;
  const sourceExample: string = `src/scripts/frontend/application/out/examples/example.application.out.txt`;
  const namePrincipalModule: string = ConvertParameter(firstParameter);
  CreateFolders(sourceDestiny);
  const fileText: string | null = readFiles(sourceExample);
  if (!fileText) {
    console.log("Archivo de ejemplo no existe... ☢️");
    return;
  }
  const textTransformed: string = ReplaceNames(fileText,
    {
      "{{NamePrincipalModule}}": namePrincipalModule,
      "{{NameNormalModule}}": firstParameter,
    });
  const dataTransformed = new Uint8Array(buffer.Buffer.from(textTransformed));
  CreateFile(`${sourceDestiny}/${firstParameter}.repository.port.ts`, dataTransformed);
}

CreateApplicationApiGateway();
