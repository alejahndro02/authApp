import { HttpClient   } from '@angular/common/http';
import { Injectable   } from '@angular/core';

import { environment  } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private dbUrlApi: string= environment.dbUrl
  constructor(private http: HttpClient) { }

  login(email:string, password:string){
    const urlApp=`${this.dbUrlApi}/auth`
    const body = {email, password} 
    
    return this.http.post<AuthResponse>(urlApp, body)
  }
}
