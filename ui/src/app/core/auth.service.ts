import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { RequesterService } from './requester.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from '../../app/models/user.model';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {
  private readonly isLoggedInSubject$ = new BehaviorSubject<boolean>(
    this.hasToken()
  );

  public constructor(
    private readonly storageService: StorageService,
    private readonly requester: RequesterService
  ) {}

  public get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject$.asObservable();
  }

  public registerUser(user: UserModel): Observable<any> {
    return this.requester.post(
      'http://localhost:4200/register',
      JSON.stringify(user)
    );
  }

  public loginUser(user: UserModel): Observable<any> {
    return this.requester
      .post(`http://localhost:8080/auth`, JSON.stringify(user))
      .pipe(
        tap(response => {
          this.storageService.setItem('token', (<any>response).data);
          this.isLoggedInSubject$.next(true);
        })
      );
  }

  public logoutUser(): Observable<any> {
    return this.requester.post('http://localhost:8080/logout', null).pipe(
      tap(() => {
        this.storageService.removeItem('token');
        this.isLoggedInSubject$.next(false);
      })
    );
  }

  public getToken() {
    const expired = this.isTokenExpired();

    if (!expired) {
      return this.storageService.getItem('token');
    }

    return false;
  }

  public isTokenExpired(token?: string): boolean {
    if(!token) token = this.storageService.getItem('token');
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date!.valueOf() > new Date().valueOf());
  }

  private getTokenExpirationDate(token: string): Date | null {
    const decoded: { exp: number } = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  private hasToken(): boolean {
    return !!this.storageService.getItem('token') && !this.isTokenExpired();
  }
}
