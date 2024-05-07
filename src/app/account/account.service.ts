import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, ReplaySubject, map, of } from 'rxjs';
import { IUser } from '../shared/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { IAddress } from '../shared/Address';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.baseURL;
  private CurrentUser = new ReplaySubject<IUser>(1);
  currentUser$ = this.CurrentUser.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(values: any) {
    return this.http.post<IUser>(this.baseUrl + 'Account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.CurrentUser.next(user);
        }
      })
    );
  }

  register(value: any) {
    return this.http.post<IUser>(this.baseUrl + 'Account/register', value).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.CurrentUser.next(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.CurrentUser.next(null as any);
    this.router.navigateByUrl('/');
  }

  checkEmailExist(email: string) {
    return this.http.get(
      this.baseUrl + 'Account/check-email-exist?email=' + email
    );
  }

  getUserAddress() {
    return this.http.get<IAddress>(this.baseUrl + 'Account/get-user-address');
  }

  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(
      this.baseUrl + 'Account/update-user-address',
      address
    );
  }

  loadCurrentUser(token: string): Observable<IUser | null> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    if (token === null) {
      this.CurrentUser.next(null as any);
      return of(null);
    }

    return this.http
      .get<IUser>(this.baseUrl + 'Account/get-current-user', { headers })
      .pipe(
        map((user: IUser) => {
          if (user) {
            localStorage.setItem('token', user.token);
            this.CurrentUser.next(user);
          }
          return user;
        })
      );
  }
}
