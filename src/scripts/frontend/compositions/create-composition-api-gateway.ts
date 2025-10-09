import * as process from "node:process";
import {ConvertParameter} from "../../hexagonal/utils/convert-parameter";
import {CreateFolders} from "../../hexagonal/utils/create-folders";
import {readFiles} from "../../hexagonal/utils/read-files";
import {ReplaceNames} from "../../hexagonal/utils/replace-names";
import {CreateFile} from "../../hexagonal/utils/create-file";
import * as buffer from "buffer";

const CreateCompositionApiGateway = () => {

    const firstVariable: string = process.argv[2];
    if (!firstVariable) {
        console.warn('Falta 1 parametro...');
        return;
    }

    CreateCompositionModuleApiGateway(firstVariable);

}

const CreateCompositionModuleApiGateway = (firstParameter: string) => {
    const sourceDestiny: string = `src/app/composition/${firstParameter}`;
    const sourceExample: string = "src/scripts/frontend/compositions/examples/module.example.compositions.txt";
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
    CreateFile(`${sourceDestiny}/${firstParameter}.composition.module.ts`, dataTransformed);
}

CreateCompositionApiGateway();
