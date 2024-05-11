import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LevelComponent } from './widgets/level/level.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        LevelComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'Project';
}
