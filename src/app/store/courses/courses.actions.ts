import { createAction, props } from '@ngrx/store';
import { Course, RequestCourse } from '../../models/courses';

export enum coursesAction {
  allCourses = '[Courses] All Courses',
  allCoursesSuccess = '[Courses] All Courses Success',
  allCoursesFail = '[Courses] All Courses Fail',
  singleCourse = '[Courses] Single Course',
  singleCourseSuccess = '[Courses] Single Course Success',
  singleCourseFail = '[Courses] Single Course Fail',
  filteredCourses = '[Courses] Filtered Courses',
  filteredCoursesSuccess = '[Courses] Filtered Course Success',
  deleteCourse = '[Courses] Delete Courses',
  deleteCourseFail = '[Courses] Delete Course Fail',
  editCourse = '[Courses] Edit Course',
  editCourseSuccess = '[Courses] Edit Course Success',
  editCourseFail = '[Courses] Edit Course Fail',
  createCourse = '[Courses] Create Course',
  createCourseSuccess = '[Courses] Create Course Success',
  createCourseFail = '[Courses] Create Course Fail',
}

export const requestAllCourses = createAction(coursesAction.allCourses);

export const requestAllCoursesSuccess = createAction(
  coursesAction.allCoursesSuccess,
  props<{ courses: Course[] }>(),
);

export const requestAllCoursesFail = createAction(
  coursesAction.allCoursesFail,
  props<{ errorMessage: string }>(),
);

export const requestSingleCourse = createAction(
  coursesAction.singleCourse,
  props<{ id: string }>(),
);

export const requestSingleCourseSuccess = createAction(
  coursesAction.singleCourseSuccess,
  props<{ course: Course }>(),
);

export const requestSingleCourseFail = createAction(
  coursesAction.singleCourseFail,
  props<{ errorMessage: string }>(),
);

export const requestFilteredCourses = createAction(
  coursesAction.filteredCourses,
  props<{ search: string }>(),
);

export const requestFilteredCoursesSuccess = createAction(
  coursesAction.filteredCoursesSuccess,
  props<{ courses: Course[] }>(),
);

export const requestDeleteCourse = createAction(
  coursesAction.deleteCourse,
  props<{ id: string }>(),
);

export const requestDeleteCourseFail = createAction(
  coursesAction.deleteCourseFail,
  props<{ errorMessage: string }>(),
);

export const requestEditCourse = createAction(
  coursesAction.editCourse,
  props<{ id: string; newCourse: RequestCourse }>(),
);

export const requestEditCourseSuccess = createAction(
  coursesAction.editCourseSuccess,
  props<{ course: Course }>(),
);

export const requestEditCourseFail = createAction(
  coursesAction.editCourseFail,
  props<{ errorMessage: string }>(),
);

export const requestCreateCourse = createAction(
  coursesAction.createCourse,
  props<{ newCourse: RequestCourse }>(),
);

export const requestCreateCourseSuccess = createAction(
  coursesAction.createCourseSuccess,
  props<{ course: Course }>(),
);

export const requestCreateCourseFail = createAction(
  coursesAction.createCourseFail,
  props<{ errorMessage: string }>(),
);
