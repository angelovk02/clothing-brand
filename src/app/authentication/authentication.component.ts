import { Component, OnInit} from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit{
  isLoggedIn = true

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: () => {
        this.isLoggedIn = false;
      },
      error: () => {
        this.isLoggedIn = false;
      },
      complete: () => {
        this.isLoggedIn = false;
      },
    });
  }
}
