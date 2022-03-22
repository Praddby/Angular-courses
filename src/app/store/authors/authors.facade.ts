import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Author } from '../../models/author';
import { requestAddAuthor, requestAuthors } from './authors.actions';
import { AppState, getAddedAuthor, getAuthors } from './authors.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthorsStateFacade {
  public addedAuthor$: Observable<Author> = this.store.pipe(select(getAddedAuthor));

  public authors$: Observable<Author[]> = this.store.pipe(select(getAuthors));

  constructor(private store: Store<AppState>) {}

  public getAuthors() {
    this.store.dispatch(requestAuthors());
  }

  public addAuthor(name: string) {
    this.store.dispatch(requestAddAuthor({ name }));
  }
}
