import { createSelector } from '@ngrx/store';
import { AuthorsState } from './authors.reducer';

export interface AppState {
  authors: AuthorsState;
}

export const selectAuthors = (state: AppState) => state.authors;

export const getAddedAuthor = createSelector(
  selectAuthors,
  (state: AuthorsState) => state.addedAuthor,
);

export const getAuthors = createSelector(selectAuthors, (state: AuthorsState) => state.authors);
