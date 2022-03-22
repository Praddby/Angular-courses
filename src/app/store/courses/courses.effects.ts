import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, mergeMap, tap } from 'rxjs/operators';
import { CoursesService } from '../../services/courses/courses.service';
import { coursesAction } from './courses.actions';
import { CoursesStateFacade } from './courses.facade';

@Injectable()
export class CoursesEffects {
  public getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coursesAction.allCourses),
      exhaustMap(() =>
        this.coursesService.getAll().pipe(
          map((response) => response.result),
          map((courses) => ({ type: coursesAction.allCoursesSuccess, courses })),
          catchError((errorMessage) => of({ type: coursesAction.allCoursesFail, errorMessage })),
        ),
      ),
    ),
  );

  public filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coursesAction.filteredCourses),
      map(({ search }) => (search as string).toLowerCase()),
      mergeMap((search) =>
        this.coursesStateFacade.allCourses$.pipe(
          map((courses) =>
            courses.filter((course) => course.title.toLowerCase()?.includes(search)),
          ),
          map((courses) => ({ type: coursesAction.filteredCoursesSuccess, courses })),
        ),
      ),
    ),
  );

  public getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coursesAction.singleCourse),
      exhaustMap(({ id }) =>
        this.coursesService.getCourse(id).pipe(
          map((response) => response.result),
          map((course) => ({ type: coursesAction.singleCourseSuccess, course })),
          catchError((errorMessage) => of({ type: coursesAction.singleCourseFail, errorMessage })),
        ),
      ),
    ),
  );

  public deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coursesAction.deleteCourse),
      exhaustMap(({ id }) =>
        this.coursesService.removeCourse(id).pipe(
          map(() => ({ type: coursesAction.allCourses })),
          catchError((errorMessage) => of({ type: coursesAction.deleteCourseFail, errorMessage })),
        ),
      ),
    ),
  );

  public editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coursesAction.editCourse),
      exhaustMap(({ id, newCourse }) =>
        this.coursesService.editCourse(id, newCourse).pipe(
          map((course) => ({ type: coursesAction.editCourseSuccess, course })),
          catchError((errorMessage) => of({ type: coursesAction.editCourseFail, errorMessage })),
        ),
      ),
    ),
  );

  public createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coursesAction.createCourse),
      exhaustMap(({ newCourse }) =>
        this.coursesService.addCourse(newCourse).pipe(
          map((course) => ({ type: coursesAction.createCourseSuccess, course })),
          catchError((errorMessage) => of({ type: coursesAction.createCourseFail, errorMessage })),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesStateFacade: CoursesStateFacade,
  ) {}
}
