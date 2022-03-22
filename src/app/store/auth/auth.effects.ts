import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap, exhaustMap } from 'rxjs/operators';
import { SessionStorageService } from '../../auth/services/session-storage.service';
import { AuthService } from '../../auth/services/auth.service';
import { authAction } from './auth.actions';

@Injectable()
export class AuthEffects {
  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.login),
      exhaustMap((payload) =>
        this.authService.login(payload).pipe(
          tap((auth) => {
            this.sessionStorageService.setToken(auth.result);
          }),
          map((auth) => ({ type: authAction.loginSuccess, token: auth.result })),
          catchError((error) => of({ type: authAction.loginFail, payload: error })),
        ),
      ),
    ),
  );

  public logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.logout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          tap(() => {
            this.sessionStorageService.deleteToken();
          }),
          map(() => ({ type: authAction.logoutSuccess })),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
  ) {}
}
