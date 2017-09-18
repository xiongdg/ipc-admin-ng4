import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { userRoutes } from './user-login.routes';
import { LoginComponent } from './login/login.component';
import { LogupComponent } from './logup/logup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [LoginComponent, LogupComponent]
})
export class UserLoginModule { }
