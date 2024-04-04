import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { createStateFactory, patch } from '@thoorio/state';

import { storageStrategy } from './storage.strategy';

export class User {
    name: string | undefined;

    constructor(data: { [K in keyof User]?: User[K] }) {
        this.name = data.name;
    }
}

const createStateFromFactory = createStateFactory({
    storage: {
        strategy: storageStrategy,
    },
});

export const state = createStateFromFactory(
    {
        key: 'statePageState',
        serialize: {
            counter: (value) => value.toString(),
        },
        deserialize: {
            counter: (value) => parseInt(value, 10),
            user: (value) => new User(value),
        },
    },
    {
        counter: 0,
        user: new User({ name: 'Adam Thoor' }),
    },
);

@Injectable({ providedIn: 'root' })
export class StatePageState {
    counter = toSignal(state.values.counter);
    user = toSignal(state.values.user);
    values = toSignal(state.values$);

    constructor() {}

    incrementCounter() {
        state.values.counter.next(state.values.counter.value + 1);
    }

    decrementCounter() {
        state.values.counter.next(state.values.counter.value - 1);
    }

    multiPatch() {
        patch(state, {
            counter: this.counter()! + 1,
            user: new User({ name: `${this.counter()! + 1} Thoor` }),
        });
    }

    reset() {
        state.reset();
    }
}
