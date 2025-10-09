export const ReplaceNames = (text: string, configuration: { [key: string]: string }): string => {
    let result = text;
    for (const [key, value] of Object.entries(configuration)) {
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapar caracteres especiales
        const regex = new RegExp(escapedKey, 'g');
        result = result.replace(regex, value);
    }
    return result;
};
