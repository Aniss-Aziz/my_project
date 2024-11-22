import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginSrv: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.loginSrv.isAuthenticated()) {
      return true; // Si l'utilisateur est authentifié, permet l'accès
    } else {
      this.router.navigate(['/login']); // Sinon, redirige vers la page de login
      return false; // Empêche l'accès à la route
    }
  }
}
