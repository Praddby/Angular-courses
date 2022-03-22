import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../../models/courses';
import { AuthorsStateFacade } from '../../store/authors/authors.facade';
import { CoursesStateFacade } from '../../store/courses/courses.facade';

@Component({
  selector: 'app-details-course',
  templateUrl: './details-course.component.html',
  styleUrls: ['./details-course.component.scss'],
})
export class DetailsCourseComponent implements OnInit {
  public titlePage: string = 'Details Course';

  public course$: Observable<Course>;

  constructor(
    private route: ActivatedRoute,
    private coursesStateFacade: CoursesStateFacade,
    private authorsStateFacade: AuthorsStateFacade,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.coursesStateFacade.getSingleCourse(id);
    this.course$ = this.courseWithAuthors$;
  }

  private courseWithAuthors$ = combineLatest([
    this.coursesStateFacade.course$,
    this.authorsStateFacade.authors$,
  ]).pipe(
    map(([course, authors]) => ({
      ...course,
      authors: authors
        .filter((author) => course.authors?.includes(author.id))
        .map((author) => author.name),
    })),
  );
}
