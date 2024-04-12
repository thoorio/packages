import { Component, inject } from '@angular/core';
import { StatePageState } from './state-page.state';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-state',
    templateUrl: './state.page.html',
    standalone: true,
    imports: [JsonPipe],
})
export class StatePage {
    public state = inject(StatePageState);

    increment(): void {
        this.state.incrementCounter();
    }

    decrement(): void {
        this.state.decrementCounter();
    }

    multiPatch(): void {
        this.state.multiPatch();
    }

    multiPatchWithCallback(): void {
        this.state.multiPatchWithCallback();
    }

    reset() {
        this.state.reset();
    }
}
