import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';

const filePath = join('./users.json');

export async function getData() {
    try {
        const data = await readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.log('Error on get data:', error);
    }
}

export async function setData(data) {
    try {
        await writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log('Error on set data:', error);
    }
}