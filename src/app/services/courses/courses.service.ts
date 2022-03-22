import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, RequestCourse } from '../../models/courses';

interface ResponseCourses {
  result: Course[];
  successful: boolean;
}

interface ResponseCourse {
  result: Course;
  successful: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  public searchCourse(search: string): Observable<ResponseCourses> {
    return this.http.get<ResponseCourses>('http://localhost:3000/courses/filter', {
      params: { title: search },
    });
  }

  public getAll(): Observable<ResponseCourses> {
    return this.http.get<ResponseCourses>('http://localhost:3000/courses/all');
  }

  public getCourse(id: string): Observable<ResponseCourse> {
    return this.http.get<ResponseCourse>(`http://localhost:3000/courses/${id}`);
  }

  public addCourse(course: RequestCourse): Observable<ResponseCourse> {
    return this.http.post<ResponseCourse>('http://localhost:3000/courses/add', course);
  }

  public editCourse(id: string, course: RequestCourse): Observable<ResponseCourse> {
    return this.http.put<ResponseCourse>(`http://localhost:3000/courses/${id}`, course);
  }

  public removeCourse(id: string): Observable<string> {
    return this.http.delete<string>(`http://localhost:3000/courses/${id}`);
  }
}
