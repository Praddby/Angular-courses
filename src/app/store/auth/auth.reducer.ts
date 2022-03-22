import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  isAuthorized: boolean;
  token: string;
  errorMessage: string;
}

export const initialState: AuthState = {
  isAuthorized: false,
  token: '',
  errorMessage: '',
};

const reducer: ActionReducer<AuthState, Action> = createReducer(
  initialState,
  on(AuthActions.requestLoginSuccess, (state, { token }) => ({
    ...state,
    isAuthorized: !!token,
    token,
  })),
  on(AuthActions.requestLoginFail, (state) => ({ ...state })),
  // on(AuthActions.requestRegister, (state) => ({ ...state })),
  on(AuthActions.requestRegisterSuccess, (state) => ({ ...state })),
  on(AuthActions.requestRegisterFail, (state) => ({ ...state })),
  on(AuthActions.requestLogoutSuccess, (state) => ({ ...state, isAuthorized: false })),
);

export const authReducer = (state: AuthState | undefined, action: Action) => reducer(state, action);
