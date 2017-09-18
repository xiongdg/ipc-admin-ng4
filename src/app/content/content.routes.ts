import { RouterModule } from '@angular/router';
import { ContentComponent } from './content.component';
import { LampStatusComponent } from './lamp-status/lamp-status.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { DevListComponent } from './dev/dev-list/dev-list.component';
import { DevInfoComponent } from './dev/dev-info/dev-info.component';
import { DevTypeListComponent } from './dev-type/dev-type-list/dev-type-list.component';
import { DevTypeInfoComponent } from './dev-type/dev-type-info/dev-type-info.component';
import { AddDevComponent } from './dev/add-dev/add-dev.component';
import { AddDevTypeComponent } from './dev-type/add-dev-type/add-dev-type.component';
import { AppListComponent } from './app/app-list/app-list.component';
import { AddAppComponent } from './app/add-app/add-app.component';
import { AppInfoComponent } from './app/app-info/app-info.component';

export const contentRoutes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      { path: '', redirectTo: 'user-list' },
      { path: 'lamp-status', component: LampStatusComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'user-info/:id', component: UserInfoComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'dev-list', component: DevListComponent },
      { path: 'dev-info/:cid', component: DevInfoComponent },
      { path: 'dev-type-list', component: DevTypeListComponent },
      { path: 'dev-type-info', component: DevTypeInfoComponent },
      { path: 'add-dev', component: AddDevComponent },
      { path: 'add-dev-type', component: AddDevTypeComponent },
      { path: 'app-list', component: AppListComponent },
      { path: 'add-app', component: AddAppComponent },
      { path: 'app-info', component: AppInfoComponent },
    ]
  },
  {
    path: '**',
    redirectTo: 'content/lamp-status'
  }
];
