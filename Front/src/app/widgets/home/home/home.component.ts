import { Component } from '@angular/core';
import { AuthService } from '../../../service/shared/auth.service';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  addLevel() {
    this.router.navigate(['/create-level']);
  }

  openLevel() {
    this.router.navigate(['/open-level']);
  }

  Guid() {
    this.router.navigate(['/library']);
  }
  profileLink() {
    this.router.navigate(['/profile']);

  }
}
