import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){};
  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map((res: HttpResponse<boolean>) => {
        if (!res.body) {
          this.router.navigate(['/home']);
          return false;
        }
        return res.body;
      }),
      catchError(() => {
        this.router.navigate(['/home']);
        return of(false);
      })
    );
  }


}
