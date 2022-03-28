import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  registro(){
    console.log(this.registerForm.valid);
    console.log(this.registerForm.value);
    console.log('registrado');
    
  }
  
  
  
  
}
