import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { contentRoutes } from './content.routes';
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

import { PaginationModule } from './../module/pagination/pagination.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(contentRoutes),
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule
  ],
  declarations: [
    ContentComponent,
    LampStatusComponent,
    UserListComponent,
    UserInfoComponent,
    AddUserComponent,
    DevListComponent,
    DevInfoComponent,
    DevTypeListComponent,
    DevTypeInfoComponent,
    AddDevComponent,
    AddDevTypeComponent,
    AppListComponent,
    AddAppComponent,
    AppInfoComponent,
  ]
})
export class ContentModule { }
