import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit {
  public titlePage: string = 'Edit Course';

  public constructor() {}

  public ngOnInit(): void {}
}
