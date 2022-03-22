import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { User } from '../../models/user';
import { UserService } from '../../auth/services/user.service';
import { userAction } from './user.actions';

@Injectable()
export class UserEffects {
  public getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userAction.currentUser),
      exhaustMap(() =>
        this.userService.getUser().pipe(
          map((user: User) => ({ type: userAction.currentUserSuccess, user })),
          catchError(() => of({ type: userAction.currentUserFail })),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
