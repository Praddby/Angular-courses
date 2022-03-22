import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent],
  imports: [FormsModule, SharedModule, RouterModule.forChild(routes)],
  exports: [LoginComponent, RouterModule],
})
export class LoginModule {}
