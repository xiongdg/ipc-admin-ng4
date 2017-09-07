import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogupComponent } from './logup/logup.component';

export const userRoutes = [
  {
    path: '',
    redirectTo: 'login',
    pathMath: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logup',
    component: LogupComponent
  }
];
