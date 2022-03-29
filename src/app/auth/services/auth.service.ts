import { HttpClient   } from '@angular/common/http';
import { Injectable   } from '@angular/core';
import { catchError, 
         map, 
         of, 
         tap          } from 'rxjs';

import { environment  } from 'src/environments/environment';
import { AuthResponse, 
         Usuario      } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private dbUrlApi: string= environment.dbUrl
  private _usuario!:Usuario; 

  get usuario(){
    return {...this._usuario}
  }

  constructor(private http: HttpClient) { }

  login(email:string, password:string){

    const urlApp=`${this.dbUrlApi}/auth`
    const body = {email, password} 
    
    return this.http.post<AuthResponse>(urlApp, body)
    .pipe(
      tap(response=>{
        console.log(response)
        if(response.ok){
          this._usuario={
            name:response.nameUser!,
            uid:response.uid!
          }
        }
      }),
      map(res => res.ok),
      catchError(err => of(err.error.msg))
    )
  }
}
