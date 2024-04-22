import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthService } from '../../shared/auth.service';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule,RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public formulaire: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.formulaire = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.errorMessage = '';
  }
  login() {
    if (this.formulaire.invalid) {
      return;
    }
    this.authService.login({ email: this.formulaire.value.email, password: this.formulaire.value.password })
    .subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Adresse e-mail ou mot de passe incorrect.';
        } else {
          this.errorMessage = 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer.';
          console.error('Erreur lors de la connexion :', error);
        }
      }
    });
  }
}
