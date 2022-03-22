import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { AuthState } from './auth.reducer';

// export interface AppState {
//   auth: AuthState;
// }

export const selectAuth = (state: AppState) => state.auth;

export const isUserAuthorized = createSelector(
  selectAuth,
  (state: AuthState) => state.isAuthorized,
);

export const getToken = createSelector(selectAuth, (state: AuthState) => state.token);

export const getSpecificErrorMessage = createSelector(
  selectAuth,
  (state: AuthState) => state.errorMessage,
);
