import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Services
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _url: string = 'http://localhost:3000';

  constructor(private _http: HttpClient, private _router: Router) {}

  public sign(payload: { email: string; password: string }): Observable<any> {
    return this._http.post<{ token: string }>(`${this._url}/sign`, payload).pipe(
      map((res) => {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', res.token);
        return this._router.navigate(['admin']);
      }),
      catchError((e) => {
        if (e.error.message) {            
            return throwError(e.error.message)
        }      

        return throwError(          
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
  }

  public logout() {
    localStorage.removeItem('access_token');
    return this._router.navigate(['']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    if (!token) return false;

    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }
}