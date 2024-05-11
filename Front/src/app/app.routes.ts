import { LevelSelectorComponent } from './widgets/level-selector/level-selector.component';
import { LevelComponent } from './widgets/level/level.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { ProfileComponent } from './home/profile/profile.component';
import { AuthGuard } from './profile.guard';
import { LibraryComponent } from './home/library/library.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'library', component: LibraryComponent, canActivate: [AuthGuard] },
    { path: 'level', component: LevelComponent, data: { level: {} }, canActivate: [AuthGuard] },
    { path: 'level-selector', component: LevelSelectorComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];
