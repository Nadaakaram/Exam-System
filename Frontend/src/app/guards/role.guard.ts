import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      this.router.navigate(['/']);
      return false;
    }

    const user = JSON.parse(userData);
    if (user.role === 'admin') {
      return true;
    }

    alert('Admins only!');
    this.router.navigate(['/']);
    return false;
  }
}
