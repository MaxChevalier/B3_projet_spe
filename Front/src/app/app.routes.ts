import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent} from './auth/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { ProfileComponent } from './home/profile/profile.component';
import { AuthGuard } from './profile.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent,  canActivate: [AuthGuard]},
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'profile', component: ProfileComponent},
    { path: '**', redirectTo: '' }
];
