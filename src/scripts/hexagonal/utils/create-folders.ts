import * as fs from "fs";

export const CreateFolders = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    } else {
        console.log('Folder exists! ☢️');
    }
}