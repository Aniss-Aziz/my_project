import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginSrv: LoginService, private router: Router) { }

  login() {
    this.loginSrv.login(this.username, this.password).subscribe((res:any) => {

      if (typeof res.user === 'object') {
        localStorage.setItem('user', JSON.stringify(res.user));
      } else {
        localStorage.setItem('user', res.user);  // Si c'est déjà une chaîne JSON
      }
      localStorage.setItem('token', res.token);
      

      this.router.navigate(['/dashboard'])
    },
    error => {
      // Gérer les erreurs de connexion
      this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
      console.error('Erreur de connexion', error);
    });
  }
}
