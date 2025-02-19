import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  projects;
  categories;
  mainTitle = 'Portfolio of Ivan Maiorov';


  private currentCategorySource = new BehaviorSubject(undefined);
  currentCategory$ = this.currentCategorySource.asObservable();

  private projectsSource = new BehaviorSubject(undefined);
  projects$ = this.projectsSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  private log(message, fail?) {
    const bg = fail ? '#eb1616' : '#62cc99';
    console.log(`%cAPI${fail ? ' fail' : ''}` + `%c ${message}`, `background:${bg};color:#fff;padding:2px 5px`, '');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // alert(`Failed to load data (${operation})`)
      console.error(error);
      this.log(`${operation} failed: ${error.message}`, true);
      return of(result as T);
    };
  }

  fetchProjects(): Observable<{}> {
    // console.log('fetch projects');
    return this.http.get('assets/data/projects.json').pipe(
      tap(_ => console.log('fetched projects')),
      catchError(this.handleError('fetchProjects', []))
    );
  }

  load() {
    // console.log('LOAD DATA');
    return new Promise((resolve, reject) => {
      this.http
      .get('assets/data/projects.json')
      .subscribe((response: any)=> {
        this.setProjects(response.projects);
        this.projects = response.projects;
        // this.categories = [...new Set(response.map(item => item.category))];
        // console.log([...new Set(response.map(item => item.category))]);
        // this.categories = response.projects.map(item => item.category);
        // console.log(this.categories)
        // this.categories = this.categories.filter((item, index) => this.categories.indexOf(item) === index);
        // console.log(this.categories)
        this.categories = response.categories;
        resolve(true);
      });
    });
  }

  setProjects(projects) {
    // console.log('set projects');
    // console.log(projects);
    // this.projects = projects;
    this.projectsSource.next(projects);
  }

  getProjects() {
    // console.log('get projects', this.projectsSource.getValue().length);
    return this.projectsSource.getValue();
  }

  getCategories() {
    // console.log('get categories');
    return this.categories;
  }

  getCurrentCategory() {
    // console.log('get current category');
    return this.currentCategorySource.getValue();
  }

  setCurrentCategory(category?) {
    // console.log('set current category to', category);
    this.currentCategorySource.next(category);
    this.filterProjects(category);
    return category;
  }

  filterProjects(category) {
    // console.log('filter projects');
    if (!category) {
      this.setProjects(this.projects);
    } else {
      this.setProjects(this.projects.filter(item => item.category === category.id));
    }
  }

}
