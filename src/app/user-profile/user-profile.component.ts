import { Component, OnInit, Input } from '@angular/core';

import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UpdateProfileComponent } from '../update-profile/update-profile.component';

//get username stored in local storage
const currentUser = localStorage.getItem('user');


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    user: any = {};
    favoriteMovies: any[] = [];
    
 
   constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }



  /**
   * Gets user data from api call and sets the user variable to returned JSON file
   * @returns object holding user information
   * @function getUser
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

   /**
   * update existing user data 
   * @returns new user data
   * @function updateDialog
   */
  updateDialog(): void {
    this.dialog.open(UpdateProfileComponent, {
      width: '300px'
    })
  }

  /**
   * @returns login screen, clearing local storage
   * @function deleteProfile
   */
   deleteProfile(): void {
    if (
      confirm(
        'Are you sure you want to delete your account? This cannnot be undone.'
      )
    ) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account.',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser(this.user).subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
 
}
