import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AuthorService } from '../../services/authors/authors.service';
import { authorsAction } from './authors.actions';

@Injectable()
export class AuthorsEffects {
  public getAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorsAction.authors),
      mergeMap(() =>
        this.authorService.getAll().pipe(
          map((response) => response.result),
          map((authors) => ({ type: authorsAction.authorsSuccess, authors })),
          catchError((error) => of({ type: authorsAction.authorsFail, error })),
        ),
      ),
    ),
  );

  public addAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorsAction.addAuthor),
      mergeMap((author) =>
        this.authorService.addAuthor(author).pipe(
          map((response) => response.result),
          map((author) => ({ type: authorsAction.addAuthorSuccess, author })),
          catchError((error) => of({ type: authorsAction.addAuthorFail, error })),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private authorService: AuthorService) {}
}
