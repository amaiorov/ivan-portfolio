import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@app/components/home/home.component';
import { AboutComponent } from '@app/components/about/about.component';
import { ContactComponent } from '@app/components/contact/contact.component';
import { ProjectComponent } from '@app/components/project/project.component';
import { PageNotFoundComponent } from '@app/components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      page: 'home',
      animation: 'Home'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      page: 'about',
      animation: 'About'
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      page: 'contact',
      animation: 'Contact'
    }
  },
  {
    path: ':category',
    component: HomeComponent,
    data: {
      page: 'home',
      animation: 'default'
    }
  },
  {
    path: 'project/:id',
    component: ProjectComponent,
    data: {
      page: 'project',
      animation: 'default'
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      page: '404',
      animation: 'default'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
