import { LevelSelectorComponent } from './widgets/game/level-selector/level-selector.component';
import { LevelComponent } from './widgets/game/level/level.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './widgets/auth/register/register.component';
import { LoginComponent } from './widgets/auth/login/login.component';
import { HomeComponent } from './widgets/home/home/home.component';
import { ProfileComponent } from './widgets/home/profile/profile.component';
import { AuthGuard } from './profile.guard';
import { LibraryComponent } from './widgets/home/library/library.component';

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
