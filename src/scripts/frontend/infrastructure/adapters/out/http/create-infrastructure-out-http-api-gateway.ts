import * as process from "node:process";
import * as buffer from "buffer";
import {ConvertParameter} from "../../../../../hexagonal/utils/convert-parameter";
import {CreateFolders} from "../../../../../hexagonal/utils/create-folders";
import {readFiles} from "../../../../../hexagonal/utils/read-files";
import {ReplaceNames} from "../../../../../hexagonal/utils/replace-names";
import {CreateFile} from "../../../../../hexagonal/utils/create-file";

const CreateInfrastructureAdapterOutHttpApiGateway = () => {

  const firstVariable: string = process.argv[2];

  if (!firstVariable) {
    console.warn('Falta 1 parametro...');
    return;
  }

  CreateOutHttpRepositoryApiGateway(firstVariable);
  CreateOutHttpModuleApiGateway(firstVariable);
  CreateOutHttpEntityApiGateway(firstVariable);
  CreateOutHttpMapperApiGateway(firstVariable);

}

const CreateOutHttpRepositoryApiGateway = (firstParameter: string) => {
  const sourceDestiny: string = `src/app/infrastructure/adapters/out/http/${firstParameter}`;
  const sourceExample: string = "src/scripts/frontend/infrastructure/adapters/out/http/examples/adapter.out.http.repository.example.txt";
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
      "{{NameNormalUpperModule}}": firstParameter.toUpperCase(),
    });
  const dataTransformed = new Uint8Array(buffer.Buffer.from(textTransformed));
  CreateFile(`${sourceDestiny}/${firstParameter}.out.http.repository.ts`, dataTransformed);
}

const CreateOutHttpModuleApiGateway = (firstParameter: string) => {
  const sourceDestiny: string = `src/app/infrastructure/adapters/out/http/${firstParameter}`;
  const sourceExample: string = "src/scripts/frontend/infrastructure/adapters/out/http/examples/adapter.out.http.module.example.txt";
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
      "{{NameNormalUpperModule}}": firstParameter.toUpperCase(),
    });
  const dataTransformed = new Uint8Array(buffer.Buffer.from(textTransformed));
  CreateFile(`${sourceDestiny}/${firstParameter}.out.http.module.ts`, dataTransformed);
}

const CreateOutHttpEntityApiGateway = (firstParameter: string) => {
  const sourceDestiny: string = `src/app/infrastructure/adapters/out/http/${firstParameter}`;
  const sourceExample: string = "src/scripts/frontend/infrastructure/adapters/out/http/examples/adapter.out.http.entity.example.txt";
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
      "{{NameNormalUpperModule}}": firstParameter.toUpperCase(),
    });
  const dataTransformed = new Uint8Array(buffer.Buffer.from(textTransformed));
  CreateFile(`${sourceDestiny}/${firstParameter}.out.http.entity.ts`, dataTransformed);
}

const CreateOutHttpMapperApiGateway = (firstParameter: string) => {
  const sourceDestiny: string = `src/app/infrastructure/adapters/out/http/${firstParameter}`;
  const sourceExample: string = "src/scripts/frontend/infrastructure/adapters/out/http/examples/adapter.out.http.mapper.example.txt";
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
      "{{NameNormalUpperModule}}": firstParameter.toUpperCase(),
    });
  const dataTransformed = new Uint8Array(buffer.Buffer.from(textTransformed));
  CreateFile(`${sourceDestiny}/${firstParameter}.out.http.mapper.ts`, dataTransformed);
}


CreateInfrastructureAdapterOutHttpApiGateway();
