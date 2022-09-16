import { Component, OnInit, Input } from '@angular/core';

//to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//brings in API calls from 6.2
import { UserRegistrationService } from '../fetch-api-data.service'

// displays notifications back to user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '' } 
  /*
    Called when creating an instance of the class
    @param fetchApiData
    @param dialogRef
    @param snackBar
  */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }
  

// This is the function responsible for sending the form inputs to the backend
/** 
   * implementing the function for sending form inputs to backend
   *Function for sending form inputs to register a user
   * saying go to fetchApi data, and pass it the userData object
   * @returns alert indicating successful registration or an error 
   * @function registerUser
  */

registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
  // Logic for a successful user registration goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     this.snackBar.open(result, 'OK', {
        duration: 2000
     });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }


}
