import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './auth/auth.effects';
import { authFeatureKey, authReducer, AuthState } from './auth/auth.reducer';
import { AuthorsEffects } from './authors/authors.effects';
import { authorsFeatureKey, authorsReducer, AuthorsState } from './authors/authors.reducer';
import { CoursesEffects } from './courses/courses.effects';
import { coursesFeatureKey, coursesReducer, CoursesState } from './courses/courses.reducer';
import { UserEffects } from './user/user.effects';
import { userFeatureKey, userReducer, UserState } from './user/user.reducer';

export interface AppState {
  [authFeatureKey]: AuthState;
  [userFeatureKey]: UserState;
  [coursesFeatureKey]: CoursesState;
  [authorsFeatureKey]: AuthorsState;
}

type Effects =
  | typeof AuthEffects
  | typeof UserEffects
  | typeof CoursesEffects
  | typeof AuthorsEffects;

export const reducers: ActionReducerMap<AppState> = {
  [authFeatureKey]: authReducer,
  [userFeatureKey]: userReducer,
  [coursesFeatureKey]: coursesReducer,
  [authorsFeatureKey]: authorsReducer,
};

export const effects: Effects[] = [AuthEffects, UserEffects, CoursesEffects, AuthorsEffects];
