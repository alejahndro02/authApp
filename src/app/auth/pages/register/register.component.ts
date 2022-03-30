import { Component, 
         OnInit       } from '@angular/core';
import { FormBuilder, 
         FormGroup, 
         Validators   } from '@angular/forms';
import { Router       } from '@angular/router';
import { AuthService  } from 'src/app/auth/services/auth.service';
import   Swal           from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup= this.fb.group({
    nameUser: ['', [Validators.required]],
    email   : ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }
  registro(){
    const { nameUser, email, password} = this.registerForm.value
    
    this.authService.registro(nameUser,email,password)
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
