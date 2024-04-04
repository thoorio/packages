import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { mergeStateInitialized } from '@thoorio/state';

import { routes } from './app.routes';
import { state } from './pages/state/state-page.state';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: () => {
                return async () => {
                    return await mergeStateInitialized([state]);
                };
            },
        },
    ],
};
