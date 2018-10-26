import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthService} from "./services/auth.service";
import {ConfigService, configurationServiceInitializerFactory} from "./modules/config";
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [
    AuthService,
    ConfigService,
    { provide: APP_INITIALIZER, useFactory: configurationServiceInitializerFactory, deps: [ConfigService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
