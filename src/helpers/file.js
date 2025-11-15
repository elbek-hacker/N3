import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const filePath = join(process.cwd(), 'data/countries.json');
export async function getData(){
    try {
        const data =  await readFile(filePath, 'utf-8');
        return JSON.parse(data)
    } catch (error) {
        console.log('Error on getting data', error.message);
    }
}
export async function setData(data){
    try {
        await writeFile(filePath, JSON.stringify(data, null, 2))
    } catch (error) {
        console.log('Error on setting data', error.message);
    }
}