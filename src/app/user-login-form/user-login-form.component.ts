import { Component, OnInit, Input } from '@angular/core';


//to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//brings in API calls from 6.2
import { UserRegistrationService } from '../fetch-api-data.service'

// displays notifications back to user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';



@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: ''} 

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }
  ngOnInit(): void {
  }

  loginUser(): void {
  
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
       this.dialogRef.close();
       console.log(response);
       
       localStorage.setItem('token', response.token);
       localStorage.setItem('user', response.user.Username);
        //redirecto to the movies page
       this.router.navigate(['movies']);
       
      
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }}
