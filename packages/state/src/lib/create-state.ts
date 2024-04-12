import { BehaviorSubject, combineLatest, from } from 'rxjs';

import { handleStorage } from './handle-storage';
import { getInitialStateValue, getInitialStateValueAsync } from './get-initial-state-value';

import type { CreateStateOptions, CreateStateValues, PatchDataOrCallback, State } from './types';

export function createState<T>(options: CreateStateOptions<T>, values: CreateStateValues<T>): State<T> {
    const state: any = {
        key: options.key,
        initialized$: new BehaviorSubject(false),
        // Spread the values object to create a new memory reference in order to avoid mutation.
        values: { ...values },
        values$: undefined,
        patch: <T>(data: PatchDataOrCallback<T>) => {
            if (typeof data === 'function') {
                const vals: any = {};

                for (const key in state.values) {
                    vals[key] = state.values[key].value;
                }

                state.patch(data(vals));
            } else {
                for (const key in data) {
                    if (Object(state.values).hasOwnProperty(key)) {
                        state.values[key].next(data[key]!);
                    }
                }
            }
        },
        reset: () => {
            state.patch(values);
        },
    };
    const storageIsAsync = options.storage?.strategy && options.storage.strategy.getItem(options.key) instanceof Promise;
    let initialStateValue: any;

    if (storageIsAsync) {
        from(getInitialStateValueAsync(options)).subscribe((initialAsyncStateValue) => {
            for (const key in values) {
                const initialValue =
                    initialAsyncStateValue && Object(initialAsyncStateValue).hasOwnProperty(key)
                        ? initialAsyncStateValue[key]
                        : values[key];

                state.values[key].next(initialValue);
            }

            handleStorage(state, options);
            state.initialized$.next(true);
        });
    } else {
        initialStateValue = getInitialStateValue(options);
    }

    for (const key in values) {
        const initialValue = initialStateValue && Object(initialStateValue).hasOwnProperty(key) ? initialStateValue[key] : values[key];

        state.values[key] = new BehaviorSubject(initialValue);
    }

    state.values$ = combineLatest(state.values);

    if (!storageIsAsync) {
        handleStorage(state, options);
    }

    return state;
}
