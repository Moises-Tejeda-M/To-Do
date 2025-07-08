import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { FallingLettersComponent } from "./falling-letters/falling-letters.component";
import { AuthService } from './auth.service';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FallingLettersComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLogged = false;

  constructor(public auth: AuthService, private router: Router) {
    this.auth.isLoggedIn$.subscribe(status => {
      this.isLogged = status;
    })

    this.auth.isLoggedIn$.subscribe(status => {
      this.isLogged = status;
    })
  }

    handleSessionButton() {
      if (this.auth.isLoggedIn()) {
        this.auth.logout();
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/login'])
      }
    }
  }

