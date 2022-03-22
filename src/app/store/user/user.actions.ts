import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

export enum userAction {
  currentUser = '[User] Current',
  currentUserSuccess = '[User] Current Success',
  currentUserFail = '[User] Current Fail',
}

export const requestCurrentUser = createAction(userAction.currentUser);

export const requestCurrentUserSuccess = createAction(
  userAction.currentUserSuccess,
  props<{ user: User }>(),
);

export const requestCurrentUserFail = createAction(userAction.currentUserFail);
