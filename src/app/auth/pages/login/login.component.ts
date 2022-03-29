import { Component    } from '@angular/core';
import { FormBuilder, 
         FormGroup, 
         Validators   } from '@angular/forms';
import { Router       } from '@angular/router';
import   Swal           from 'sweetalert2';
import { AuthService  } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  // Se crea la referencia al formulario 
  loginForm :FormGroup =  this.fb.group({
    email   :['qtzim@gmail.com', [Validators.required, Validators.email]],
    password:['1233456', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder, 
              private router: Router,
              private authService: AuthService) { }

  login(){
    console.log(this.loginForm.value);
    const {email, password} = this.loginForm.value
    this.authService.login(email,password)
    .subscribe( valido => {
      console.log(valido );
      if(valido===true){
        this.router.navigateByUrl('/dashboard')
      }else{
        console.log('error');
        Swal.fire('Error', valido, 'error')
      }
    })

  }
}
