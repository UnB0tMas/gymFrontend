import { Component }      from '@angular/core';
import { LoginViewModel } from '../../../viewmodels/auth/login.viewmodel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public vm: LoginViewModel) {}
}
