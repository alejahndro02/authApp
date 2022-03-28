import { Component    } from '@angular/core';
import { FormBuilder, 
         FormGroup, 
         Validators   } from '@angular/forms';
import { Router       } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  // Se crea la referencia al formulario 
  loginForm :FormGroup =  this.fb.group({
    email   :['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder, private router: Router) { }

  login(){
    this.router.navigateByUrl('/dashboard')
  }
}
