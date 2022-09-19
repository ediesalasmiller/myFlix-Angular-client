import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  //declare a varirable named movies as an array
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,) { }

    ngOnInit(): void {
      this.getMovies();
    }
    /**
    * opens the user director dialog from DirectorComponent to displaying details
    * @return all movies
    */
    getMovies(): void {
      this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(resp);
        return this.movies
      })
    }

    /**
  * opens the user director dialog from DirectorComponent to displaying details
  * @param name
  * @param bio
  * @param birthday
  */
    openDirectorDialog(name: string, bio: string, birthday: Date): void {
      this.dialog.open(DirectorComponent, {
        data: {
        Name: name,
        Bio: bio,
        Birth: birthday,
      },
      // Assign dialog width
      width: '500px'  
    })
    }

    /**
  * opens the user genre dialog from GenreComponent to displaying details
  * @param name
  * @param description
  */
    openGenreDialog(name: string, description: string): void {
      this.dialog.open(GenreComponent, {
        data: {
        Name: name,
        Description: description
      },
      // Assign dialog width
      width: '500px'  
    })
    }

    /**
   * opens the user synopsis dialog from SynopsisComponent to displaying details
   * @param title
   * @param description
   */
    openSynopsisDialog(title: string, description: string): void {
      this.dialog.open(SynopsisComponent, {
        data: {
        Title: title,
        Description: description
      },
      // Assign dialog width
      width: '500px'  
    })
    }

  getFavoriteMovies(movieID: any): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }
  /**
   * 
   * @param id 
   * @returns true for favorite, else false
   */
   isFav(id: string): boolean {
    return this.favoriteMovies.includes(id)
  }

      /**
   * adds a movie to the list of favorite movies via an API call
   * @param id 
   * @function addFavoriteMovie
   */
  addFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.addFavorite(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open("Successfully added to your favorites!", 'OK', {
        duration:2000
      })
      this.ngOnInit();
    })
  }

  /**
   * removes a movie from the list of favorite movies via an API call
   * @param id 
   * @function removeFavoriteMovie
   */
  removeFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavorite(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }


}
