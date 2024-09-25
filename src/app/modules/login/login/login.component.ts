import { Component } from '@angular/core';
import { LoginService } from '../api/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private loginService: LoginService) {}

  onSubmit() {
    this.loginService.login(this.username, this.password)
      .subscribe(
        response => {
          console.log(response);  // แสดงผลลัพธ์จาก backend
          if (response === 'Login Successful') {
            alert('Login successful');
          } else {
            alert('Login failed');
          }
        },
        error => {
          console.error('Error:', error);
        }
      );
  }
}
