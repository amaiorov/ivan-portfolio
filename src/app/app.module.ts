import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@app/app-routing.module';
import { DataManagerService } from '@app/datamanager.service';
import { AppComponent } from '@app/app.component';
import { ContentComponent } from '@app/components/content.component';
import { HomeComponent } from '@app/components/home/home.component';
import { AboutComponent } from '@app/components/about/about.component';
import { ContactComponent } from '@app/components/contact/contact.component';
import { ProjectComponent } from '@app/components/project/project.component';
import { PageNotFoundComponent } from '@app/components/pagenotfound/pagenotfound.component';
import { NavComponent } from '@app/components/nav/nav.component';
import { FilterComponent } from '@app/components/filter/filter.component';
import { HeaderComponent } from '@app/components/header/header.component';
import { FooterComponent } from '@app/components/footer/footer.component';
import { SliderComponent } from '@app/components/slider/slider.component';

import { ConcatPipe } from '@app/concat.pipe';

export function dataManagerFactory(provider: DataManagerService) {
  return () => provider.load();
}

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProjectComponent,
    PageNotFoundComponent,
    NavComponent,
    FilterComponent,
    FooterComponent,
    HeaderComponent,
    SliderComponent,
    ConcatPipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    DataManagerService,
    {
      provide: APP_INITIALIZER,
      useFactory: dataManagerFactory,
      deps: [DataManagerService], multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
