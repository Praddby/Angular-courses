import { NgModule } from '@angular/core';
import { EditCourseComponent } from './edit-course.component';
import { SharedModule } from '../../shared/shared.module';
import { CourseFormModule } from '../course-form/course-form.module';

@NgModule({
  declarations: [EditCourseComponent],
  imports: [SharedModule, CourseFormModule],
  exports: [EditCourseComponent],
})
export class EditCourseModule {}
