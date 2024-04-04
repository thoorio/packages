import { StorageStrategy } from '@thoorio/state';

export const storageStrategy: StorageStrategy = {
    async getItem(key: string) {
        return new Promise((resolve) => {
            resolve(localStorage.getItem(key));
        });
    },

    async setItem(key: string, value: any) {
        return new Promise((resolve) => {
            localStorage.setItem(key, value);

            resolve();
        });
    },

    async removeItem(key: string) {
        return new Promise((resolve) => {
            localStorage.removeItem(key);

            resolve();
        });
    },
};
