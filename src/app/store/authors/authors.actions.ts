import { createAction, props } from '@ngrx/store';
import { Author } from '../../models/author';

export enum authorsAction {
  authors = '[Authors] Authors',
  authorsSuccess = '[Authors] Authors Success',
  authorsFail = '[Authors] Authors Fail',
  addAuthor = '[Authors] Add Author',
  addAuthorSuccess = '[Authors] Add Author Success',
  addAuthorFail = '[Authors] Add Author Fail',
  resetAddedAuthor = '[Authors] Reset Added Author',
}

export const requestAuthors = createAction(authorsAction.authors);

export const requestAuthorsSuccess = createAction(
  authorsAction.authorsSuccess,
  props<{ authors: Author[] }>(),
);

export const requestAuthorsFail = createAction(authorsAction.authorsFail);

export const requestAddAuthor = createAction(authorsAction.addAuthor, props<{ name: string }>());

export const requestAddAuthorSuccess = createAction(
  authorsAction.addAuthorSuccess,
  props<{ author: Author }>(),
);

export const requestAddAuthorFail = createAction(authorsAction.addAuthorFail);

export const resetAddedAuthor = createAction(authorsAction.resetAddedAuthor);
