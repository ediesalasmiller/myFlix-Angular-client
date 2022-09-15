import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  //declare a varirable named movies as an array
  movies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,) { }

    ngOnInit(): void {
      this.getMovies()
    }

    getMovies(): void {
      this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(resp);
        return this.movies
      })
    }

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



}
