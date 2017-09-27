import { AccesstokenService } from './service/accesstoken.service';
import { AuthGardGuard } from './gard/auth-gard.guard';
import { StoreService } from './service/store.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

import { HttpService } from './service/http.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    RouterModule.forRoot(appRoutes
      , { useHash: true }
    ),
    ReactiveFormsModule
  ],
  providers: [HttpService, StoreService, AuthGardGuard, AccesstokenService],     // TODO
  bootstrap: [AppComponent]
})
export class AppModule { }
