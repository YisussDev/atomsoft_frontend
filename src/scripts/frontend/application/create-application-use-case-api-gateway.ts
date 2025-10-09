import * as process from "node:process";
import {ConvertParameter} from "../../hexagonal/utils/convert-parameter";
import {CreateFolders} from "../../hexagonal/utils/create-folders";
import {readFiles} from "../../hexagonal/utils/read-files";
import {ReplaceNames} from "../../hexagonal/utils/replace-names";
import {CreateFile} from "../../hexagonal/utils/create-file";
import * as buffer from "buffer";

const CreateCustomUseCaseApplicationApiGateway = () => {
    CreateApplicationInApiGateway();
}

// Principals

const CreateApplicationInApiGateway = () => {

    const firstVariable: string = process.argv[2];
    const secondVariable: string = process.argv[3];

    if (!firstVariable) {
        console.warn('Falta 1 parametro...');
        return;
    }
    if (!secondVariable) {
        console.warn('Falta segundo parametro...');
        return;
    }

    CreateCustomUseCaseApiGateway(firstVariable, secondVariable);

}


const CreateCustomUseCaseApiGateway = (firstParameter: string, secondParameter: string) => {
    const sourceDestiny: string = `src/application/ports/in/${firstParameter}`;
    const sourceExample: string = "src/scripts/api_gateway/application/in/examples/custom.example.application.in.txt";
    const namePrincipalModule: string = ConvertParameter(firstParameter);
    const nameUseCaseModule: string = ConvertParameter(secondParameter);
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
            "{{NameUseCaseModule}}": nameUseCaseModule,
            "{{NameNormalUseCaseModule}}": secondParameter,
        });
    const dataTransformed = new Uint8Array(buffer.Buffer.from(textTransformed));
    CreateFile(`${sourceDestiny}/${secondParameter}-${firstParameter}.use-case.ts`, dataTransformed);
}

CreateCustomUseCaseApplicationApiGateway();