import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { AuthFormComponent } from '../../shared/auth-form/auth-form.component';

@Component({
  selector: 'app-signup',
  imports: [NavbarComponent, AuthFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

}
