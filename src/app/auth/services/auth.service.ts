import { HttpClient, 
         HttpHeaders } from '@angular/common/http';
import { Injectable  } from '@angular/core';
import { catchError,
         map,
         Observable,
         of,
         tap         } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthResponse,
         Usuario     } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private dbUrlApi: string = environment.dbUrl
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario }
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {

    const urlApp = `${this.dbUrlApi}/auth`
    const body = { email, password }

    return this.http.post<AuthResponse>(urlApp, body)
      .pipe(
        tap(response => {
          if (response.ok) {
            // Se crea el localStorage para almacenar el token
            localStorage.setItem('token', response.token!)
            this._usuario = {
              name: response.nameUser!,
              uid: response.uid!
            }
          }
        }),
        map(res => res.ok),
        catchError(err => of(err.error.msg))
      )
  }
  validarToken():Observable<boolean> {
    const urlApp = `${this.dbUrlApi}/auth/newToken`
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '')
      // Se hace una peticion http, pasandole la url y los headers
    return this.http.get<AuthResponse>(urlApp, {headers})
      .pipe (
        map(resp=>{
         localStorage.setItem('token', resp.token!)
         this._usuario = {
           name: resp.nameUser!,
           uid: resp.uid!
         }
          return resp.ok
        }),
        catchError(err => of(false))
      )
  }
}
