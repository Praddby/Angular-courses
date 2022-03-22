import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, of } from 'rxjs';
import { AuthorsStateFacade } from '../../store/authors/authors.facade';
import { Course } from '../../models/courses';
import { CoursesStateFacade } from '../../store/courses/courses.facade';
import { UserStateFacade } from '../../store/user/user.facade';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  public courses$: Observable<Course[]>;

  @Input() public editable$: Observable<boolean> = this.userStateFacade.isAdmin$;

  @Output() public removeCourseEvent = new EventEmitter<string>();

  @Output() public editCourseEvent = new EventEmitter<string>();

  @Output() public showCourseEvent = new EventEmitter<string>();

  @Output() public clickSearchEvent = new EventEmitter<string>();

  public buttonInfo = 'Add new course';
  public textInfo = "Please use the 'Add new course' button to add your first course";
  public titleInfo = 'Your list is empty';
  public titleModal: string = 'Modal';
  public messageModal: string;
  public isModal: boolean = false;
  private idCourse: string;

  public constructor(
    private coursesStateFacade: CoursesStateFacade,
    private authorsStateFacade: AuthorsStateFacade,
    private router: Router,
    private userStateFacade: UserStateFacade,
  ) {}

  public ngOnInit(): void {
    this.authorsStateFacade.getAuthors();
    this.coursesStateFacade.getAllCourses();
    this.courses$ = this.coursesWithAuthors$;
  }

  public clickSearch(search: string): void {
    this.coursesStateFacade.getFilteredCourses(search);
  }

  public handlerSubmit(success: boolean) {
    if (success) {
      this.coursesStateFacade.deleteCourse(this.idCourse);
      this.isModal = false;
    }
  }

  public addCourse(): void {
    this.router.navigate(['/courses/add']);
  }

  public removeCourse(id: string): void {
    this.titleModal = 'Delete course';
    this.messageModal = 'Are you sure you want to delete the course?';
    this.isModal = true;
    this.idCourse = id;
  }

  public editCourse(id: string): void {
    this.router.navigate([`/courses/edit/${id}`]);
  }

  public showCourse(id: string): void {
    this.router.navigate([`/courses/${id}`]);
  }

  private coursesWithAuthors$ = combineLatest([
    this.coursesStateFacade.courses$,
    this.authorsStateFacade.authors$,
  ]).pipe(
    map(([courses, authors]) =>
      courses.map((course: Course) => ({
        ...course,
        authors: authors
          .filter((author) => course.authors?.includes(author.id))
          .map((author) => author.name),
      })),
    ),
  );
}
