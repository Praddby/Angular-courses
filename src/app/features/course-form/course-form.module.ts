import { NgModule } from '@angular/core';
import { CourseFormComponent } from './course-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CourseFormComponent],
  imports: [ReactiveFormsModule, SharedModule],
  exports: [CourseFormComponent],
})
export class CourseFormModule {}
