import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { SharedModule } from '../../shared/shared.module';
import { CourseModule } from '../course/course.module';
import { DetailsCourseComponent } from '../details-course/details-course.component';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import { AddCourseComponent } from '../add-course/add-course.component';
import { AddCourseModule } from '../add-course/add-course.module';
import { EditCourseModule } from '../edit-course/edit-course.module';
import { DetailsCourseModule } from '../details-course/details-course.module';

const routes: Routes = [
  {
    path: 'add',
    component: AddCourseComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'edit/:id',
    component: EditCourseComponent,
    canActivate: [AdminGuard],
  },
  { path: '', component: CoursesComponent },
  { path: ':id', component: DetailsCourseComponent },
];

@NgModule({
  declarations: [CoursesComponent],
  imports: [CourseModule, SharedModule, RouterModule.forChild(routes)],
  exports: [CoursesComponent, RouterModule, EditCourseModule, DetailsCourseModule],
})
export class CoursesModule {}
