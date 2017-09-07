import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import { userRoutes } from './user-login.routes';
import { LoginComponent } from './login/login.component';
import { LogupComponent } from './logup/logup.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [LoginComponent, LogupComponent]
})
export class UserLoginModule { }
