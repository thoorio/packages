import { createState } from './create-state';
import { CreateStateFactoryOptions, CreateStateOptions, CreateStateValues } from './types';

export function createStateFactory(options: CreateStateFactoryOptions) {
    return function <T>(opt: CreateStateOptions<T>, values: CreateStateValues<T>) {
        return createState(deepMergeObjects(options, opt), values);
    };
}

function deepMergeObjects(target: any, source: any) {
    for (const key in source) {
        if (source[key].constructor === Object) {
            Object.assign(source[key], deepMergeObjects(target[key], source[key]));
        }
    }

    Object.assign(target || {}, source);

    return target;
}
