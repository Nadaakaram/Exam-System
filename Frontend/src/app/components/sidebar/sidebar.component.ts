import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  user: any = null;
selectedComponent: string = 'dashboard';

@Output() componentChanged: EventEmitter<string> = new EventEmitter<string>();

  changeComponent(component: string) {
    this.selectedComponent = component;
    this.componentChanged.emit(component);
  }



  constructor(private userService: UserService, private router: Router) {}

ngOnInit(): void {
  this.userService.currentUser.subscribe({
    next: (user) => {
      this.user = user;
    },
    error: (err) => {
      console.error('Failed to load user', err);
    },
  });

  this.userService.getCurrentUser().subscribe({
    next: (user) => {
      this.userService.setUser(user);
    },
    error: (err) => {
      console.error('Failed to load user', err);
    },
  });
}




  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
