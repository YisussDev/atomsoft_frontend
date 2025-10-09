import * as fs from 'fs';
import * as path from 'path';

export const CreateFile = (filePath: string, data: any) => {
    const dir = path.dirname(filePath);

    // Asegura que el directorio exista
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Crea el archivo si no existe
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, data);
        console.log('✅ File created successfully!');
    } else {
        console.log('⚠️ File already exists!');
    }
};
