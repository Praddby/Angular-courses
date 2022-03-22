import { NgModule } from '@angular/core';
import { AddCourseComponent } from './add-course.component';
import { SharedModule } from '../../shared/shared.module';
import { CourseFormModule } from '../course-form/course-form.module';

@NgModule({
  declarations: [AddCourseComponent],
  imports: [SharedModule, CourseFormModule],
  exports: [AddCourseComponent],
})
export class AddCourseModule {}
