import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginData } from '../../auth/services/auth.service';
import { AppState } from '..';
import { SessionStorageService } from '../../auth/services/session-storage.service';
import { User } from '../../models/user';
import {
  requestLogin,
  requestLoginSuccess,
  requestLogout,
  requestLogoutSuccess,
  requestRegister,
} from './auth.actions';
import { getSpecificErrorMessage, getToken, isUserAuthorized } from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthStateFacade {
  public isAuthorized$: Observable<boolean> = this.store.pipe(select(isUserAuthorized));

  public getToken$: Observable<string> = this.store.pipe(select(getToken));

  public getLoginErrorMessage$: Observable<string> = this.store.pipe(
    select(getSpecificErrorMessage),
  );

  public getRegisterErrorMessage$: Observable<string> = this.store.pipe(
    select(getSpecificErrorMessage),
  );

  constructor(
    private store: Store<AppState>,
    private sessionStorageService: SessionStorageService,
  ) {}

  public login(body: LoginData) {
    this.store.dispatch(requestLogin(body));
  }

  public register(body: User) {
    this.store.dispatch(requestRegister(body));
  }

  public logout() {
    this.store.dispatch(requestLogout());
  }

  public closeSession() {
    this.store.dispatch(requestLogoutSuccess());
  }

  public setAuthorization() {
    console.log(this.sessionStorageService.getToken());
    this.store.dispatch(requestLoginSuccess({ token: this.sessionStorageService.getToken() }));
  }
}
