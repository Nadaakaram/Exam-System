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

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error loading user', err);
      }
    });
  }

  saveProfile() {
    // هتضيفي هنا كود الحفظ لو عندك API لتحديث المستخدم
    console.log('Save profile clicked', this.user);
    this.userService.updateUser(this.user).subscribe({
      next: (data) => {
        console.log('Profile updated successfully', data);

      },
      error: (err) => {
        console.error('Error updating profile', err);
      }
    });
  }
}
