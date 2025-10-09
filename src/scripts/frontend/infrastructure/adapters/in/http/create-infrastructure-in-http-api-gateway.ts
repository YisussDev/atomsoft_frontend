import * as process from "node:process";
import * as buffer from "buffer";
import {ConvertParameter} from "../../../../../hexagonal/utils/convert-parameter";
import {CreateFolders} from "../../../../../hexagonal/utils/create-folders";
import {readFiles} from "../../../../../hexagonal/utils/read-files";
import {ReplaceNames} from "../../../../../hexagonal/utils/replace-names";
import {CreateFile} from "../../../../../hexagonal/utils/create-file";

const CreateInfrastructureAdapterInHttpApiGateway = () => {

    const firstVariable: string = process.argv[2];

    if (!firstVariable) {
        console.warn('Falta 1 parametro...');
        return;
    }

    CreateInHttpControllerApiGateway(firstVariable);

}

const CreateInHttpControllerApiGateway = (firstParameter: string) => {
    const sourceDestiny: string = `src/infrastructure/adapters/in/http/${firstParameter}`;
    const sourceExample: string = "src/scripts/api_gateway/infrastructure/adapters/in/http/examples/infrastructure.adapter.in.http.controller.example.txt";
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
    CreateFile(`${sourceDestiny}/${firstParameter}.in.http.controller.ts`, dataTransformed);
}


CreateInfrastructureAdapterInHttpApiGateway();