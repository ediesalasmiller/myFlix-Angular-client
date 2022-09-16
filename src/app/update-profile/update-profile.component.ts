import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  
  @Input() userData: any = {};
 
   constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UpdateProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

   /**
   * @returns updated user information
   * @function editUser
   * @params userData
   */
  editUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((result) => {
      this.dialogRef.close();
      console.log(result);
      this.snackBar.open("Successfully Updated Profile!", 'OK', {
        duration:2000
      })
    })
  }
}
