import * as fs from "fs";

export const readFiles = (path: string): string | null => {
    if (fs.existsSync(path)) {
        return fs.readFileSync(path, 'utf8');
    } else {
        console.log('File not exists!');
        return null;
    }
}