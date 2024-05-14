import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../service/userService/user.service';
import { User } from '../../../service/userService/user';
import { CommonModule } from '@angular/common';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user!: User;
  profileForm!: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    let token = localStorage.getItem('token') ?? undefined;
    this.userService.getUserInfo(token).subscribe(
      (user: User) => {
        this.user = user;
        this.profileForm.patchValue({
          name: user.name,
          email: user.email,
          password: ''
        });
      },
      error => {
        console.error('Erreur lors de la récupération des informations utilisateur :', error);
      }
    );
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }
    this.user.name = this.profileForm.value.name;
    this.user.email = this.profileForm.value.email;
    this.user.password = this.profileForm.value.password;
    let token = localStorage.getItem('token')!;
    this.userService.updateUser(this.user, token).subscribe(
      (token: any) => {
        console.log('Utilisateur mis à jour!');
        localStorage.setItem('token', token);
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      }
    );
  }
}
