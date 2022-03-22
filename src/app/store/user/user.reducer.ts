import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  isAdmin: boolean;
  name: string;
}

export const initialState: UserState = {
  isAdmin: false,
  name: '',
};

const reducer: ActionReducer<UserState, Action> = createReducer(
  initialState,
  on(UserActions.requestCurrentUserSuccess, (state, { user }) => ({
    ...state,
    name: user.name,
    isAdmin: user.role === 'admin',
  })),
  on(UserActions.requestCurrentUserFail, (state) => ({ ...state })),
);

export const userReducer = (state: UserState | undefined, action: Action) => reducer(state, action);
