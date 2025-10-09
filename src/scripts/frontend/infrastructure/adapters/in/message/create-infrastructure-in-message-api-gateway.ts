import * as process from "node:process";
import * as buffer from "buffer";
import {ConvertParameter} from "../../../../../hexagonal/utils/convert-parameter";
import {CreateFolders} from "../../../../../hexagonal/utils/create-folders";
import {readFiles} from "../../../../../hexagonal/utils/read-files";
import {ReplaceNames} from "../../../../../hexagonal/utils/replace-names";
import {CreateFile} from "../../../../../hexagonal/utils/create-file";

const CreateInfrastructureAdapterInMessageApiGateway = () => {

    const firstVariable: string = process.argv[2];

    if (!firstVariable) {
        console.warn('Falta 1 parametro...');
        return;
    }

    CreateInMessageControllerApiGateway(firstVariable);

}

const CreateInMessageControllerApiGateway = (firstParameter: string) => {
    const sourceDestiny: string = `src/infrastructure/adapters/in/message/${firstParameter}`;
    const sourceExample: string = "src/scripts/api_gateway/infrastructure/adapters/in/message/examples/adapter.in.message.controller.example.txt";
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
    CreateFile(`${sourceDestiny}/${firstParameter}.in.message.controller.ts`, dataTransformed);
}


CreateInfrastructureAdapterInMessageApiGateway();