import * as process from "node:process";
import {ConvertParameter} from "../../hexagonal/utils/convert-parameter";
import {CreateFolders} from "../../hexagonal/utils/create-folders";
import {readFiles} from "../../hexagonal/utils/read-files";
import {ReplaceNames} from "../../hexagonal/utils/replace-names";
import {CreateFile} from "../../hexagonal/utils/create-file";
import * as buffer from "buffer";

const CreateDomainApiGateway = () => {

    const firstVariable: string = process.argv[2];

    if (!firstVariable) {
        console.warn('Falta 1 parametro...');
        return;
    }

    CreateEntityApiGateway(firstVariable);

}

const CreateEntityApiGateway = (firstParameter: string) => {
    const sourceDestiny: string = `src/app/domain/entities/${firstParameter}`;
    const sourceExample: string = "src/scripts/frontend/domain/entities/examples/example.entity.txt";
    const namePrincipalModule: string = ConvertParameter(firstParameter);
    CreateFolders(sourceDestiny);
    const fileText: string | null = readFiles(sourceExample);
    if (!fileText) {
        console.log("Archivo de ejemplo no existe... ☢️");
        return;
    }
    const textTransformed: string = ReplaceNames(fileText, {"{{NamePrincipalModule}}": namePrincipalModule});
    const dataTransformed = new Uint8Array(buffer.Buffer.from(textTransformed));
    CreateFile(`${sourceDestiny}/${firstParameter}.entity.ts`, dataTransformed);
}

CreateDomainApiGateway();
