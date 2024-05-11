import { LevelSelectorComponent } from './widgets/level-selector/level-selector.component';
import { LevelComponent } from './widgets/level/level.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        title: 'Home',
        path: '',
        component: LevelComponent

    },
    {
        path: 'level',
        component: LevelComponent,
        data: { level: {} }
    },
    {
        title: 'level-selector',
        path: 'level-selector',
        component: LevelSelectorComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
