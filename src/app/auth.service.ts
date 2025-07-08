import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.checkUser());

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {}
  private checkUser(): boolean {
    return localStorage.getItem('token') !== null;
  }

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('token', 'fale-token');
      localStorage.setItem('currentUser', email);
      this.loggedIn.next(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser')
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('currentUser')
  }
}
