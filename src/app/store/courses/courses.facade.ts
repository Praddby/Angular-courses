import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Author } from '../../models/author';
import { Course, RequestCourse } from '../../models/courses';
import {
  requestAllCourses,
  requestCreateCourse,
  requestDeleteCourse,
  requestEditCourse,
  requestFilteredCourses,
  requestSingleCourse,
} from './courses.actions';
import {
  AppState,
  getAllCourses,
  getCourse,
  getCourses,
  getErrorMessage,
  isAllCoursesLoadingSelector,
  isSearchingStateSelector,
  isSingleCourseLoadingSelector,
} from './courses.selectors';

@Injectable({
  providedIn: 'root',
})
export class CoursesStateFacade {
  public isAllCoursesLoading$: Observable<boolean> = this.store.pipe(
    select(isAllCoursesLoadingSelector),
  );

  public isSingleCourseLoading$: Observable<boolean> = this.store.pipe(
    select(isSingleCourseLoadingSelector),
  );

  public isSearchingState$: Observable<boolean> = this.store.pipe(select(isSearchingStateSelector));

  public allCourses$: Observable<Course[]> = this.store.pipe(select(getAllCourses));

  public courses$: Observable<Course[]> = this.store.pipe(select(getCourses));

  public course$: Observable<Course> = this.store.pipe(select(getCourse));

  public errorMessage$: Observable<string> = this.store.pipe(select(getErrorMessage));

  constructor(private store: Store<AppState>) {}

  public getAllCourses() {
    this.store.dispatch(requestAllCourses());
  }

  public getSingleCourse(id: string) {
    this.store.dispatch(requestSingleCourse({ id }));
  }

  public getFilteredCourses(search: string) {
    this.store.dispatch(requestFilteredCourses({ search }));
  }

  public editCourse(id: string, course: RequestCourse) {
    const newCourse: RequestCourse = {
      ...course,
      authors: (course.authors as Author[]).map((author) => author.id),
    };
    this.store.dispatch(requestEditCourse({ id, newCourse }));
  }

  public createCourse(course: RequestCourse) {
    const newCourse: RequestCourse = {
      ...course,
      authors: (course.authors as Author[]).map((author) => author.id),
    };
    this.store.dispatch(requestCreateCourse({ newCourse }));
  }

  public deleteCourse(id: string) {
    this.store.dispatch(requestDeleteCourse({ id }));
  }
}
