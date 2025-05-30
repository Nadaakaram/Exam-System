import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  standalone: true,
  imports: [FormsModule , RouterModule],
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: any = null;
  editedUser: any = {};

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe({
      next: (data) => {
        this.user = data;
        this.editedUser = { ...data }; 
      },
      error: (err) => {
        console.error('Error loading user', err);
      }
    });
  }

saveProfile() {
  this.userService.updateUser(this.editedUser).subscribe({
    next: () => {
      this.userService.getCurrentUser().subscribe({
        next: (freshUser) => {
          this.user = freshUser;
          this.userService.setUser(freshUser);
        }
      });
    },
    error: (err) => {
      console.error('Error updating profile', err);
    }
  });
}

}
