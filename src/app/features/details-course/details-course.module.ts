import { NgModule } from '@angular/core';
import { DetailsCourseComponent } from './details-course.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DetailsCourseComponent],
  imports: [SharedModule],
  exports: [DetailsCourseComponent],
})
export class DetailsCourseModule {}
