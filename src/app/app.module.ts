import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

import { HttpService } from './service/http.service';
import { StoreService } from './service/store.service';

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
    RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  providers: [HttpService, StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
