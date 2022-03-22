import { Action, createReducer, on } from '@ngrx/store';
import { Course } from '../../models/courses';
import * as CourseActions from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  allCourses: Course[];
  courses: Course[];
  course: Course;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string;
}

export const initialState: CoursesState = {
  allCourses: [],
  courses: [],
  course: { id: '', title: '', description: '', duration: 0, creationDate: '', authors: [] },
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: '',
};

const reducer = createReducer(
  initialState,
  on(CourseActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    allCourses: courses,
  })),
  on(CourseActions.requestAllCoursesFail, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
  })),
  on(CourseActions.requestSingleCourseSuccess, (state, { course }) => ({ ...state, course })),
  on(CourseActions.requestSingleCourseFail, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
  })),
  on(CourseActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
  })),
  on(CourseActions.requestDeleteCourseFail, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
  })),
  on(CourseActions.requestEditCourseSuccess, (state, { course }) => ({ ...state, course })),
  on(CourseActions.requestEditCourseFail, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
  })),
  on(CourseActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    courses: [...state.courses, course],
  })),
  on(CourseActions.requestCreateCourseFail, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
  })),
);

export const coursesReducer = (state: CoursesState | undefined, action: Action) =>
  reducer(state, action);
