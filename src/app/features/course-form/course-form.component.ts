import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Author } from '../../models/author';
import { Course } from '../../models/courses';
import { AuthorsStateFacade } from '../../store/authors/authors.facade';
import { CoursesStateFacade } from '../../store/courses/courses.facade';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit, OnDestroy {
  public form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    duration: [0, [Validators.required, Validators.min(0)]],
    authors: this.fb.array([], this.authorValidatior.call(this)),
  });

  public course$: Observable<Course>;

  public isDisableAuthorBtn = false;

  public submitButton: string;

  private idCourse: string;

  private onlyNumberAndLetter: RegExp = /^[A-Za-z0-9]+$/;

  private addedAuthorSubscribe: Subscription;

  @HostListener('input', ['$event.target'])
  onInput(author: HTMLInputElement) {
    this.toggleClassError(author);
  }

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesStateFacade: CoursesStateFacade,
    private authorsStateFacade: AuthorsStateFacade,
    private fb: FormBuilder,
  ) {}

  get authors() {
    return this.form.controls['authors'] as FormArray;
  }

  public ngOnInit(): void {
    this.idCourse = this.route.snapshot.params['id'];
    if (this.idCourse) {
      this.submitButton = 'Edit course';
      this.coursesStateFacade.getSingleCourse(this.idCourse);
      this.courseWithAuthors$.subscribe((course) => {
        this.form.patchValue(course);
        course.authors.forEach((author) => {
          this.authors.push(this.fb.group(author));
        });
      });
    } else {
      this.submitButton = 'Create course';
    }
    this.addedAuthorSubscribe = this.authorsStateFacade.addedAuthor$.subscribe((author) => {
      author.id && this.authors.push(this.fb.group(author));
    });
  }

  ngOnDestroy(): void {
    this.addedAuthorSubscribe.unsubscribe();
    this.form.reset();
  }

  public onSubmit(): void {
    if (this.idCourse) {
      this.coursesStateFacade.editCourse(this.idCourse, this.form.value);
    } else {
      this.coursesStateFacade.createCourse(this.form.value);
    }
    this.router.navigate(['/courses']);
  }

  public addAuthor(author: HTMLInputElement): void {
    if (this.checkInputAuthor(author)) {
      this.authorsStateFacade.addAuthor(author.value);
      author.value = '';
    }
  }

  public removeAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  private authorValidatior(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isInvalid = control.value.some(
        (value: Author) => !this.onlyNumberAndLetter?.test(value.name),
      );

      return isInvalid ? { incorrectName: true } : null;
    };
  }

  private toggleClassError(author: HTMLInputElement) {
    if (!this.checkInputAuthor(author)) {
      author.classList.add('error');
      this.isDisableAuthorBtn = true;
    } else {
      author.classList.remove('error');
      this.isDisableAuthorBtn = false;
    }
  }

  private checkInputAuthor(author: HTMLInputElement): boolean {
    return this.onlyNumberAndLetter?.test(author.value);
  }

  private courseWithAuthors$ = combineLatest([
    this.coursesStateFacade.course$,
    this.authorsStateFacade.authors$,
  ]).pipe(
    map(([course, authors]) => ({
      ...course,
      authors: authors.filter((author) => course.authors?.includes(author.id)),
    })),
  );
}
