import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators'

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://edieflixdb.herokuapp.com/';

//get token
const token = localStorage.getItem('token');
//get username stored in local storage
const currentUser = localStorage.getItem('user');

const movieID = localStorage.getItem('movie._id')

@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }


 // Making the api call for the user registration endpoint

   /**
   * @service POST to an API endpoint to register a new user
   * @param {any} userDetails
   * @returns a new user object in json format
   * @function userRegistration
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);

    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

   /**
   * @service POST to an API endpoint to login a user
   * @param {any} userDetails: any
   * @returns user object JSON
   * @function userLogin
   * @returns
   */

  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
        catchError(this.handleError)
      )
  }


  
  /**
   * @service GET to an API endpoint to get all movies
   * @returns an array of all movies in json format
   * @function getAllMovies
   */
  getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  //get specific movie
     /**
   * @service GET to an API endpoint to get a movie by title
   * @param {string} title
   * @returns a an array of movie objects in json format
   * @function getMovie
   */
  public getMovie(title: any) : Observable<any> {
    return this.http
      .get(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

    // display director infortmation for specific movie
      /**
   * @service GET to an API endpoint to get a director by name
   * @param {string} name
   * @returns array of Director information
   * @function getDirector
   */
  public getDirector(name: any): Observable<any> {
    return this.http
      .get(apiUrl + `director/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData), 
        catchError(this.handleError));
  }

    //get genre
    /**
   * @service GET to an API endpoint to get a genre by name
   * @param {string} name
   * @returns array of genre information
   * @function getGenre
   */
  public getGenre(name: any): Observable<any> {
    return this.http
      .get(apiUrl + `genre/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(this.extractResponseData), 
        catchError(this.handleError));
  }
  //get user profile , where favorite movies is stored
    /**
   * @service GET to an API endpoint to get a specific user
   * @returns a user object in json format
   * @function getUser
   */

  public getUser(): Observable<any> {
    return this.http
      .get(apiUrl + `users/${currentUser}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData), 
        catchError(this.handleError));
  }

    //Edit User info
   /**
   * @service PUT to an API endpoint to update a user's details
   * @param {string} user: any
   * @returns user JSON object
   * @function updateUser
   */
  public updateUser(user: any): Observable<any> {
    return this.http
      .put(apiUrl +  `users/${currentUser}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData), 
        catchError(this.handleError));
  }
  
  //add to favorite movies
   /**
   * @service DELETE to an API endpoint to delete a user
   * @param {string} user
   * @returns success message
   * @function deleteUser
   */


  public deleteUser(user: any): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${currentUser}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData), 
        catchError(this.handleError));
  }

   /**
   * @service GET to an API endpoint to get favorites for a specific user
   * @param {string} movieID
   * @returns favorite movie ID
   * @function getFavoriteMovies
   */
   getFavoriteMovies(): Observable<any> {
    return this.http
      .get(apiUrl + `users/${currentUser}/favorites/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //add to favorite movies
   /**
   * @service POST to an API endpoint to add favorites for a specific user
   * @param {string} movieID
   * @returns favorite movie ID
   * @function addFavorite
   */
  public addFavorite(movieID: any): Observable<any> {
    return this.http
      .post(apiUrl + `users/${currentUser}/favorites/${movieID}`, {}, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData), 
        catchError(this.handleError));
  }

   //delete to favorite movies
     /**
   * @service DELETE to an API endpoint to delete favorite movie for a specific user
   * @param {string} movieID
   * @returns success message
   * @function deleteFavorite
   */
  public deleteFavorite(movieID: any): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${currentUser}/favorites/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), 
      catchError(this.handleError));
  }


// Non-typed response extraction
  private extractResponseData(res: Object) {
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
