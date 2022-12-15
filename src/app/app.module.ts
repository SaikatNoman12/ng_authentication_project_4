import { AuthInterceptorInterceptor } from './appInterceptor/auth-interceptor.interceptor';
import { AppComponent } from './app.component';

// modules:------------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderModule } from './header/header.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
