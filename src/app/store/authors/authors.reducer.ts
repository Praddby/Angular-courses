import { Action, createReducer, on } from '@ngrx/store';
import { Author } from '../../models/author';
import * as AuthorsActions from './authors.actions';

export const authorsFeatureKey = 'authors';

export interface AuthorsState {
  authors: Array<Author>;
  addedAuthor: Author;
}

export const initialState: AuthorsState = {
  authors: [],
  addedAuthor: { id: '', name: '' },
};

const reducer = createReducer(
  initialState,
  on(AuthorsActions.requestAuthorsSuccess, (state, { authors }) => ({ ...state, authors })),
  on(AuthorsActions.requestAuthorsFail, (state) => ({ ...state })),
  on(AuthorsActions.requestAddAuthorSuccess, (state, { author }) => ({
    ...state,
    addedAuthor: author,
  })),
  on(AuthorsActions.requestAddAuthorFail, (state) => ({ ...state })),
  on(AuthorsActions.resetAddedAuthor, (state) => ({ ...state })),
);

export const authorsReducer = (state: AuthorsState | undefined, action: Action) =>
  reducer(state, action);
