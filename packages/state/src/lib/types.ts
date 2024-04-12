import type { BehaviorSubject, Observable } from 'rxjs';

export interface StorageStrategy {
    getItem(key: string): string | null | Promise<string | null>;
    setItem(key: string, value: any): void | Promise<void>;
    removeItem(key: string): void | Promise<void>;
}

export interface CreateStateOptions<T> {
    key: string;

    storage?: {
        excludeKeys?: (keyof T)[];
        strategy?: StorageStrategy;
        debounce?: number;
    };

    serialize?: {
        [K in keyof T]?: (value: T[K]) => any;
    };

    deserialize?: {
        [K in keyof T]?: (value: any) => T[K];
    };
}

export interface CreateStateFactoryOptions {
    storage?: {
        strategy?: StorageStrategy;
        debounce?: number;
    };
}

export type PatchDataOrCallback<T> = Partial<T> | ((values: { [K in keyof T]: T[K] }) => Partial<T>);

export interface State<T> {
    key: string;
    initialized$: BehaviorSubject<boolean>;
    values: { [K in keyof T]: BehaviorSubject<T[K]> };
    values$: Observable<T>;
    patch(dataOrPatchCallback: PatchDataOrCallback<T>): void;
    reset: () => void;
}

export type CreateStateValues<T> = { [K in keyof T]: T[K] };
