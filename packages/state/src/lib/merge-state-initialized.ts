import { filter, firstValueFrom, forkJoin, skip, take } from 'rxjs';

import type { State } from './types';

export async function mergeStateInitialized(states: State<any>[]) {
    const sources = states.map((state) =>
        state.initialized$.pipe(
            skip(1),
            filter((initialized) => initialized),
            take(1),
        ),
    );

    return await firstValueFrom(forkJoin(sources));
}
