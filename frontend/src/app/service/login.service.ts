import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { global } from '../../global/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private api = global.apiUrl;
  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post<any>(`${this.api}/login`, credentials);
    
  }

  register(username:string, password:string, role:string): Observable<any> {
    const register_credentials = { username, password, role };
    return this.http.post<any>(`${this.api}/register`, register_credentials);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    
    return !!token;  // Retourne true si le token est présent, sinon false


  }
  
}
