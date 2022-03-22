import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: RegistrationComponent }];

@NgModule({
  declarations: [RegistrationComponent],
  imports: [SharedModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [RegistrationComponent, RouterModule],
})
export class RegistrationModule {}
