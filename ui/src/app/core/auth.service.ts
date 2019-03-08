import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { RequesterService } from './requester.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from '../../app/models/user.model';

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
      .post('http://localhost:4200/login', JSON.stringify(user))
      .pipe(
        tap(response => {
          this.storageService.setItem('token', (<any>response).token);
          this.isLoggedInSubject$.next(true);
        })
      );
  }

  public logoutUser(): Observable<any> {
    return this.requester.post('http://localhost:4200/logout', null).pipe(
      tap(() => {
        this.storageService.removeItem('token');
        this.isLoggedInSubject$.next(false);
      })
    );
  }

  private hasToken(): boolean {
    return !!this.storageService.getItem('token');
  }
}
