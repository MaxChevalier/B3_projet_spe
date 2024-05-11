import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../service/shared/auth.service';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule,RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public formulaire: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.formulaire = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    this.errorMessage = '';
  }
  register() {
    if (this.formulaire.invalid) {
      return;
    }
    if (this.formulaire.value.password !== this.formulaire.value.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }
    this.authService.register({ name: this.formulaire.value.name, email: this.formulaire.value.email, password: this.formulaire.value.password })
      .subscribe({
        next: (response) => {
          if (response && response.error) {
            this.errorMessage = response.error.message;
          } else {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          if (error.status === 409) {
            this.errorMessage = 'Cette adresse e-mail est déjà utilisée.';
          } else {
            this.errorMessage = 'Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.';
            console.error('Erreur lors de l\'inscription :', error);
          }
        }
      });
  }
}
