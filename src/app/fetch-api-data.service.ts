import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://edieflixdb.herokuapp.com/';

//get token
const token = localStorage.getItem('token');
//get username stored in local storage
const username = localStorage.getItem('username');


@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }


 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);

    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
        catchError(this.handleError)
      )
  }


  //get all movies endpoint
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  //get specific movie
   // param: Title- {string}
  public getMovie(Title: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'movies/:title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

    // display director infortmation for specific movie
    // param: Name- {string}
  public getDirector(name: any): Observable<any> {
    return this.http.get(apiUrl + 'directors/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

    //get genre
     // param: genre- {string}
  public getGenre(genre: any): Observable<any> {
    return this.http.get(apiUrl + 'genres/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //get user profile , where favorite movies is stored
  public getUser(username: any): Observable<any> {
    return this.http.get(apiUrl + 'users/:Username', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //add to favorite movies
  public addFavorite(movieID: any): Observable<any> {
    return this.http.put(apiUrl + 'users/:Username/Movies/:MovieID', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Edit User info
  public updateUser(username: any): Observable<any> {
    return this.http.put(apiUrl + 'users/:Username', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  //add to favorite movies
  public deleteUser(username: any): Observable<any> {
    return this.http.delete(apiUrl + 'users/:Username/', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

   //delete to favorite movies
  public deleteFavorite(movieID: any): Observable<any> {
    return this.http.delete(apiUrl + 'users/:Username/Movies/:MovieID', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  

// Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}
