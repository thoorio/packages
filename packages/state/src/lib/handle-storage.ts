import { BehaviorSubject, combineLatest, debounceTime } from 'rxjs';

import type { CreateStateOptions, State } from './types';

export function handleStorage(state: State<any>, options: CreateStateOptions<any>) {
    const { key, values } = state;
    const { storage, serialize } = options;
    const storageStrategy = storage?.strategy || window.localStorage;
    const valuesToStore: { [key: string]: BehaviorSubject<any> } = {};

    for (const valueKey in values) {
        if (storage?.excludeKeys?.includes(valueKey)) {
            continue;
        }

        valuesToStore[valueKey] = values[valueKey];
    }

    const storageKey = `state:${key}`;

    combineLatest(valuesToStore)
        .pipe(debounceTime(storage?.debounce || 0))
        .subscribe(async (data) => {
            for (const dataKey in data) {
                const value = data[dataKey];
                const serializeFn = serialize?.[dataKey];

                if (serializeFn) {
                    data[dataKey] = serializeFn(value);
                }
            }

            await storageStrategy.setItem(storageKey, JSON.stringify(data));
        });
}
