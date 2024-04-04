import { State } from './types';

export function patch<T>(state: State<T>, data: Partial<T>) {
    for (const key in data) {
        if (Object(state.values).hasOwnProperty(key)) {
            state.values[key].next(data[key]!);
        }
    }
}
