import type { CreateStateOptions } from './types';

export async function getInitialStateValueAsync(options: CreateStateOptions<any>): Promise<any> {
    const { deserialize, storage } = options;
    const storageStrategy = storage?.strategy || window.localStorage;
    const storageValue: string | null = await storageStrategy.getItem(`state:${options.key}`);
    let parsedValue: { [key: string]: any } = {};

    try {
        parsedValue = JSON.parse(storageValue as string);

        for (const key in parsedValue) {
            if (deserialize?.[key]) {
                parsedValue[key] = deserialize[key]!(parsedValue[key]);
            }
        }
    } catch {
        console.error('Error while parsing the initial state value.');
    }

    return parsedValue;
}

export function getInitialStateValue(options: CreateStateOptions<any>): any {
    const { deserialize, storage } = options;
    const storageStrategy = storage?.strategy || window.localStorage;
    const storageValue = storageStrategy.getItem(`state:${options.key}`);
    let parsedValue: { [key: string]: any } = {};

    try {
        parsedValue = JSON.parse(storageValue as string);

        for (const key in parsedValue) {
            if (deserialize?.[key]) {
                parsedValue[key] = deserialize[key]!(parsedValue[key]);
            }
        }
    } catch {}

    return parsedValue;
}
