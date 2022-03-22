import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrashAlt, faPen, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Course } from '../../models/courses';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  @Input() public course: Course;

  @Input() public editable$: Observable<boolean>;

  @Output() editCourseEvent = new EventEmitter<string>();

  @Output() removeCourseEvent = new EventEmitter<string>();

  @Output() showCourseEvent = new EventEmitter<string>();

  public showCourseBtn: string = 'Show course';
  public iconDelete: IconDefinition = faTrashAlt;
  public iconEdit: IconDefinition = faPen;

  public constructor() {}

  public ngOnInit(): void {}

  public editCourse(id: string): void {
    this.editCourseEvent.emit(id);
  }

  public removeCourse(id: string): void {
    this.removeCourseEvent.emit(id);
  }

  public showCourse(id: string): void {
    this.showCourseEvent.emit(id);
  }
}
