import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { UserState } from './user.reducer';

// export interface AppState {
//   user: UserState;
// }

export const selectUser = (state: AppState) => state.user;

export const getName = createSelector(selectUser, (state: UserState) => state.name);

export const isAdmin = createSelector(selectUser, (state: UserState) => state.isAdmin);
