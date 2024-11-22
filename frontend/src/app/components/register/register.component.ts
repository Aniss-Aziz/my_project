import { Component } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  username: string = '';
  role: string = ''
  password: string = '';
  errorRegisterMessage: string|null = null;
  successRegisterMessage: string|null = null;

  constructor(private loginSrv: LoginService, private router: Router) {}

  register(){

    if (!this.username|| !this.password || !this.role) {
      this.errorRegisterMessage = "Please fill in all required fields.";
      return;
    }

    this.loginSrv.register(this.username, this.password, this.role).subscribe((res:any) => {

      this.errorRegisterMessage = null;
      this.successRegisterMessage = null;

      if(res) {
        this.successRegisterMessage =  'Registration successful welcome !';

        setTimeout(() => {
          this.successRegisterMessage = null;
          this.router.navigate(['/login']);
        }, 1500);
      } else {
        this.errorRegisterMessage = res.error;

        setTimeout(() => {
          this.errorRegisterMessage = null;
        }, 1500);
      }
  

    }, (error) => {
      this.errorRegisterMessage = 'An error occurred during registration. Please try again.';
    });
  }
}
