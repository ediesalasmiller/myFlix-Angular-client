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
  /*
    implementing the function for sending form inputs to backend
  Function for sending form inputs to register a user
  saying go to fetchApi data, and pass it the userData object
  @returns alert indicating successful registration or an error
  */
 registerUser(): void {
  this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
    //logiv for success
    this.dialogRef.close(); // close modal on success
    console.log(response)
    //snackBar tells user it was a success
    this.snackBar.open('User Registration success!', 'OK', {
      duration: 2000
    });
  }, (response) => {
    console.log(response)
    this.snackBar.open('User Registration successful', 'OK', {
      duration: 2000
    })
  })
 }

}
