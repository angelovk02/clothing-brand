import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from 'src/app/user/user.service'


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private userService: UserService, private router: Router) {}

  get isLoggedIn(): boolean{
    return this.userService.isLogged
  }

  dropdown: boolean = false

  toggleDropdown(event: Event) {
    event.preventDefault()
    this.dropdown = !this.dropdown
    console.log('Dropdown Toggled:', this.dropdown)
  }
  
  logout(): void{
    this.userService.logout().subscribe({

      next: () =>{
        this.router.navigate(['/user/login'])
      },
      error:() =>{
        this.router.navigate(['/user/login'])
      }
    })
  }
}
