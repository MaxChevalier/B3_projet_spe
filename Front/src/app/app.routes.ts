import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    //{ path: '', component: AccueilComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }
];
