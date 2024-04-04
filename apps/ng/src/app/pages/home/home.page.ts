import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    standalone: true,
    imports: [RouterLink],
})
export class HomePage {
    routes = [
        {
            path: '/state',
            label: 'State',
        },
    ];
}
