import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean

}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  signup(email: string, password: true) {
    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKey,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(catchError (this.habdleError),
           tap(resData => {
              this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
           })
    );
  }

  login(email: string, password: string) {
     return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      ).pipe(catchError(this.habdleError),
             tap(resData => {
             this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
  }

logout() {
  this.user.next(null);
  this.router.navigate(['/auth']);
  localStorage.removeItem('userData');
  if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
  }
  this.tokenExpirationTimer= null;
}

autoLogout(expirationDuration: number) {
  this.tokenExpirationTimer = setTimeout(() => {
    this.logout();
  }, expirationDuration);
}

autoLogin() {
  const userData: {
    email: string,
    id: string,
    _token: string,
    _tokenExpirationDate: Date
  } = JSON.parse(localStorage.getItem('userData'));

  if(!userData) {
      return;
  }

  const loadeUser = new User(userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate));

  if(loadeUser.token) {
      this.user.next(loadeUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
  }
}
private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {

  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  const user = new User( email, userId, token, expirationDate);
  this.user.next(user);
  this.autoLogout(expiresIn * 1000);
  localStorage.setItem('userData', JSON.stringify(user));

}

private habdleError(errorRes: HttpErrorResponse) {
    let errorMessag = 'An unknown error occured';

    if(!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessag);
    }
    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS' :
       errorMessag= 'this email exists already';
       break;
      case 'EMAIL_NOT_FOUND' :
        errorMessag= 'this email is not correct';
        break;
      case 'INVALID_PASSWORD' :
        errorMessag= 'this passowrd is not correct';
        break;
    }

    return throwError(errorMessag);

  }

}
