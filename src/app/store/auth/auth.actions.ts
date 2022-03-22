import { createAction, props } from '@ngrx/store';

export enum authAction {
  login = '[Auth] Login',
  loginSuccess = '[Auth] Login Success',
  loginFail = '[Auth] Login Fail',
  register = '[Auth] Register',
  registerSuccess = '[Auth] Register Success',
  registerFail = '[Auth] Register Fail',
  logout = '[Auth] Logout',
  logoutSuccess = '[Auth] Logout Success',
}

export const requestLogin = createAction(
  authAction.login,
  props<{ email: string; password: string }>(),
);

export const requestLoginSuccess = createAction(
  authAction.loginSuccess,
  props<{ token: string }>(),
);

export const requestLoginFail = createAction(
  authAction.loginFail,
  props<{ errorMessage: string }>(),
);

export const requestRegister = createAction(
  authAction.register,
  props<{ name: string; email: string; password: string }>(),
);

export const requestRegisterSuccess = createAction(
  authAction.registerSuccess,
  props<{ token: string }>(),
);

export const requestRegisterFail = createAction(
  authAction.registerFail,
  props<{ errorMessage: string }>(),
);

export const requestLogout = createAction(authAction.logout);

export const requestLogoutSuccess = createAction(authAction.logoutSuccess);
